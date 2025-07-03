<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ProfileFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_profile_page()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/profil')->assertOk();
    }

    public function test_user_can_update_profile()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->post('/profil/update', ['name' => 'Nama Baru', 'bio' => 'Bio tes'])
            ->assertRedirect();

        $this->assertEquals('Nama Baru', $user->fresh()->name);
        $this->assertEquals('Bio tes', $user->fresh()->bio);
    }

    public function test_user_can_change_password()
    {
        $user = User::factory()->create(['password' => bcrypt('password_lama')]);

        $this->actingAs($user)
            ->post('/profil/password', [
                'current_password' => 'password_lama',
                'password' => 'password_baru123',
                'password_confirmation' => 'password_baru123',
            ])
            ->assertRedirect();

        $this->assertTrue(Hash::check('password_baru123', $user->fresh()->password));
    }

    public function test_user_can_logout_all_devices()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->post('/profil/logout-all')
            ->assertRedirect();
    }

    public function test_user_can_delete_account()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->delete('/profil/delete')
            ->assertRedirect();

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_user_can_resend_verification_email()
    {
        Notification::fake();
        $user = User::factory()->unverified()->create();

        $this->actingAs($user)
            ->post('/profil/resend-verification')
            ->assertRedirect();

        Notification::assertSentTo($user, \Illuminate\Auth\Notifications\VerifyEmail::class);
    }
}
