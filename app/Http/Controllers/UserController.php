<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    public function profil()
{
    $user = Auth::user();
    $user->avatar_url = $user->avatar ? asset('storage/' . $user->avatar) : null;

    // Dummy data aktivitas
    $comments = collect([
        ['id' => 1, 'content' => 'Artikel ini sangat bermanfaat!', 'article_title' => 'Apa Itu AI?', 'created_at' => now()->subDays(2)],
        ['id' => 2, 'content' => 'Saya setuju dengan pendapat ini.', 'article_title' => 'Mengenal Teknologi Web 3.0', 'created_at' => now()->subDay()],
    ]);

    $likedArticles = collect([
        ['id' => 1, 'title' => 'Pemrograman Dasar untuk Pemula', 'slug' => 'pemrograman-dasar'],
        ['id' => 2, 'title' => 'Tips Menulis Artikel yang Baik', 'slug' => 'tips-menulis'],
    ]);

    $history = collect([
        ['id' => 1, 'title' => 'Perkembangan Teknologi Blockchain', 'visited_at' => now()->subMinutes(30)],
        ['id' => 2, 'title' => 'Mengenal TrioTahril', 'visited_at' => now()->subHours(1)],
    ]);

    return Inertia::render('Auth/Profile', [
        'auth' => [
            'user' => $user,
        ],
        'must_verify_email' => $user->email_verified_at === null,
        'activity' => [
            'comments' => $comments,
            'liked' => $likedArticles,
            'history' => $history,
        ],
    ]);
}

    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $user->name = $request->name;
        $user->bio = $request->bio;

        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->save();

        return back()->with('success', 'Profil berhasil diperbarui.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, (string) $user->password)) {
            return back()->withErrors(['current_password' => 'Password lama tidak sesuai.']);
        }

        $user->password = $request->password;
        $user->save();

        return back()->with('success', 'Password berhasil diperbarui.');
    }

    public function resendEmailVerification(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return back()->with('success', 'Email Anda sudah terverifikasi.');
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('success', 'Email verifikasi telah dikirim ulang.');
    }

    public function logoutAllDevices(Request $request)
    {
        DB::table('sessions')->where('user_id', $request->user()->id)->delete();

        Auth::logout();
        Session::flush();

        return redirect('/login')->with('success', 'Berhasil logout dari semua perangkat.');
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        Auth::logout();
        $user->delete();

        return redirect('/')->with('success', 'Akun berhasil dihapus.');
    }
}
