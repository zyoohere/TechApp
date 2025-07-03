<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Redirect;


class AuthController extends Controller
{
    public function showForm()
    {
        return Inertia::render('Auth/OtpLogin');
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan.']);
        }

        $otp = rand(100000, 999999);
        Cache::put('otp_' . $user->email, $otp, now()->addMinutes(10));

        Mail::raw("Kode OTP Anda: $otp", function ($message) use ($user) {
            $message->to($user->email)->subject('Kode OTP Reset Password');
        });

        return Redirect::to('/forgot-password')
            ->with('success', 'OTP telah dikirim.')
            ->with('otp_step', 'verify')
            ->with('otp_email', $user->email);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);
        session(['otp_verified_email' => $request->email]);
        $cachedOtp = Cache::get('otp_' . $request->email);
        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return back()->withErrors(['otp' => 'OTP tidak valid.']);
        }

        return Redirect::to('/forgot-password')
            ->with('success', 'OTP valid. Silakan reset password.')
            ->with('otp_step', 'reset')
            ->with('otp_email', $request->email);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6|confirmed',
        ]);

        $email = session('otp_verified_email');

        if (!$email) {
            return back()->withErrors(['email' => 'Email tidak ditemukan di sesi OTP.']);
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'User tidak ditemukan.']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Hapus OTP dari cache dan session
        Cache::forget('otp_' . $user->email);
        session()->forget('otp_verified_email');

        return redirect('/login')->with('success', 'Password berhasil direset.');
    }
}
