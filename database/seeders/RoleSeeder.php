<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Permissions Umum
        $permissions = [
            'tulis artikel',
            'edit artikel',
            'hapus artikel',
            'publish artikel',
            'review artikel',
            'komentar artikel',
            'simpan artikel',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // Roles
        $admin       = Role::firstOrCreate(['name' => 'admin']);
        $editor      = Role::firstOrCreate(['name' => 'editor']);
        $penulis     = Role::firstOrCreate(['name' => 'penulis']);
        $kontributor = Role::firstOrCreate(['name' => 'kontributor']);
        $user        = Role::firstOrCreate(['name' => 'user']);

        // Assign permissions ke role
        $admin->givePermissionTo(Permission::all());

        $editor->givePermissionTo([
            'edit artikel',
            'publish artikel',
            'review artikel',
        ]);

        $penulis->givePermissionTo([
            'tulis artikel',
            'edit artikel',
        ]);

        $kontributor->givePermissionTo([
            'tulis artikel',
        ]);

        $user->givePermissionTo([
            'komentar artikel',
            'simpan artikel',
        ]);
    }
}
