<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function show($slug)
    {
        $posts = Artikel::where('slug', $slug)
            ->with(['category', 'user'])
            ->firstOrFail();
        $categories = Category::all();
        $comments = Comment::with('user')
            ->where('artikel_id', $posts->id)
            ->where('status', 'approved')
            ->latest()
            ->get();
        $tags = Tag::whereHas('artikels', function ($query) use ($posts) {
            $query->where('artikel_id', $posts->id);
        })->get();
        $relatedArticles = Artikel::where('category_id', $posts->category_id)
            ->where('id', '!=', $posts->id)
            ->latest()
            ->take(3)
            ->get();
        $latestArticles = Artikel::latest()->take(5)->get();
        return Inertia::render('Artikel/Index', [
            'artikels' => $posts,
            'categories' => $categories,
            'comments' => $comments,
            'tags' => $tags,
            'relatedArticles' => $relatedArticles,
            'hastag' => Tag::all(),
            'latestArticles' => $latestArticles,

        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $categories = Category::all();
        $articles = Artikel::with('category', 'user')
            ->where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->orderByDesc('published_at')
            ->paginate(10)
            ->appends(['q' => $query]);

        return Inertia::render('Artikel/search', [
            'artikels' => $articles,
            'query' => $query,
            'categories' => $categories,
        ]);
    }
}
