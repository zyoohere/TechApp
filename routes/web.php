<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/kategori/{slug}', [CategoryController::class, 'show'])->name('kategori.show');
Route::get('/media', [MediaController::class, 'index'])->name('media.index');
Route::get('/search', [ArtikelController::class, 'search'])->name('articles.search');
Route::get('/artikel/{slug}', [ArtikelController::class, 'show'])->name('articles.show');
Route::post('/artikel/komentar', [CommentController::class, 'store']);

Route::get('/Company', function () {
    return Inertia::render('CompanyProfile', [
        'categories' => Category::all(),
    ]);
});
Route::get('/redaksi', function () {
    return Inertia::render('Redaksi/RedaksiPage', [
        'categories' => Category::all()
    ]);
});


Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'store']);
Route::get('/register', [RegisterController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/profil', [UserController::class, 'profil'])->name('profil');
    Route::post('/profil/update', [UserController::class, 'update'])->name('profil.update');
    Route::post('/profil/password', [UserController::class, 'updatePassword'])->name('profil.password');
    Route::post('/profil/resend-verification', [UserController::class, 'resendEmailVerification']);
    Route::post('/profil/logout-all', [UserController::class, 'logoutAllDevices']);
    Route::delete('/profil/delete', [UserController::class, 'destroy']);
});

Route::middleware('guest')->group(function () {
    Route::get('/forgot-password', [AuthController::class, 'showForm']);
    Route::post('/forgot-password/send', [AuthController::class, 'sendOtp']);
    Route::post('/forgot-password/verify', [AuthController::class, 'verifyOtp']);
    Route::post('/forgot-password/reset', [AuthController::class, 'resetPassword']);
});


