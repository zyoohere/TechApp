<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CategoryController extends Controller
{
      public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $artikels = $category->artikels()
            ->with('user')
            ->where('status', 'published')
            ->latest()
            ->paginate(6);
            // ->get();

        return Inertia::render('Artikel/Category', [
            'category' => $category,
            'artikels' => $artikels,
            'categories' => Category::all(),
        ]);
    }
}
