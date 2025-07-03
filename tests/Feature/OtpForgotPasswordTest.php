<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class OtpForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_request_otp()
    {
        Notification::fake();

        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $response = $this->post('/forgot-password/send', [
            'email' => $user->email,
        ]);

        $response->assertStatus(302); // redirect with success
        $response->assertSessionHas('success');
        $response->assertSessionHas('otp_step', 'verify');
        $response->assertSessionHas('otp_email', $user->email);

        $this->assertTrue(Cache::has('otp_' . $user->email));
    }

    public function test_user_cannot_verify_invalid_otp()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        Cache::put('otp_' . $user->email, '123456', 600); // valid OTP is 123456

        $response = $this->post('/forgot-password/verify', [
            'email' => $user->email,
            'otp' => '000000',
        ]);

        $response->assertSessionHasErrors(['otp']);
    }

    public function test_user_can_verify_valid_otp()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        Cache::put('otp_' . $user->email, '123456', 600); // valid OTP

        $response = $this->post('/forgot-password/verify', [
            'email' => $user->email,
            'otp' => '123456',
        ]);

        $response->assertStatus(302);
        $response->assertSessionHas('success');
        $response->assertSessionHas('otp_step', 'reset');
        $response->assertSessionHas('otp_email', $user->email);
        $this->assertEquals(session('otp_verified_email'), $user->email);
    }

    public function test_user_can_reset_password_with_verified_otp()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        // Simulasikan OTP telah diverifikasi
        $this->withSession([
            'otp_verified_email' => $user->email,
        ]);

        $response = $this->post('/forgot-password/reset', [
            'password' => 'passwordbaru123',
            'password_confirmation' => 'passwordbaru123',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('success');

        $this->assertTrue(Hash::check('passwordbaru123', $user->fresh()->password));
    }

    public function test_user_cannot_reset_password_without_verified_otp()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $response = $this->post('/forgot-password/reset', [
            'password' => 'passwordbaru123',
            'password_confirmation' => 'passwordbaru123',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertFalse(Hash::check('passwordbaru123', $user->fresh()->password));
    }
}
