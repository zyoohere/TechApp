<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'), // ganti saat production
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        // Penulis
        $penulis = User::firstOrCreate(
            ['email' => 'penulis@example.com'],
            [
                'name' => 'Penulis',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $penulis->assignRole('penulis');

        // Editor
        $editor = User::firstOrCreate(
            ['email' => 'editor@example.com'],
            [
                'name' => 'Editor',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $editor->assignRole('editor');

        // Kontributor
        $kontributor = User::firstOrCreate(
            ['email' => 'kontributor@example.com'],
            [
                'name' => 'Kontributor',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $kontributor->assignRole('kontributor');

        // User biasa
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User Biasa',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $user->assignRole('user');
    }
}
