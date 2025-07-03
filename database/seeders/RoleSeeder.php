<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Buat permissions (opsional)
        Permission::firstOrCreate(['name' => 'tulis berita']);
        Permission::firstOrCreate(['name' => 'hapus berita']);

        // Buat roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $penulis = Role::firstOrCreate(['name' => 'penulis']);
        $penulis = Role::firstOrCreate(['name' => 'user']);

        // Assign permission ke role
        $admin->givePermissionTo(Permission::all());
        $penulis->givePermissionTo('tulis berita');
    }
}
