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
                'password' => Hash::make('password'), // ganti untuk keamanan
            ]
        );
        $admin->assignRole('admin');

        // Penulis
        $penulis = User::firstOrCreate(
            ['email' => 'penulis@example.com'],
            [
                'name' => 'Penulis',
                'password' => Hash::make('password'),
            ]
        );
        $penulis->assignRole('penulis');
    }
}
