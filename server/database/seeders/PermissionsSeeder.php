<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User Management
            ['name' => 'Create User', 'slug' => 'create_user', 'group' => 'User Management'],
            ['name' => 'Edit User', 'slug' => 'edit_user', 'group' => 'User Management'],
            ['name' => 'Delete User', 'slug' => 'delete_user', 'group' => 'User Management'],
            ['name' => 'View User', 'slug' => 'view_user', 'group' => 'User Management'],

            // Role
            ['name' => 'Create Role', 'slug' => 'create_role', 'group' => 'Role'],
            ['name' => 'Edit Role', 'slug' => 'edit_role', 'group' => 'Role'],
            ['name' => 'Delete Role', 'slug' => 'delete_role', 'group' => 'Role'],
            ['name' => 'View Role', 'slug' => 'view_role', 'group' => 'Role'],
            ['name' => 'Assign Role', 'slug' => 'assign_role', 'group' => 'Role'],

            // Permission
            ['name' => 'Create Permission', 'slug' => 'create_permission', 'group' => 'Permission'],
            ['name' => 'Edit Permission', 'slug' => 'edit_permission', 'group' => 'Permission'],
            ['name' => 'Delete Permission', 'slug' => 'delete_permission', 'group' => 'Permission'],
            ['name' => 'View Permission', 'slug' => 'view_permission', 'group' => 'Permission'],
            ['name' => 'Assign Permission', 'slug' => 'assign_permission', 'group' => 'Permission'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['slug' => $permission['slug']], // Check if the slug exists
                [
                    'name' => $permission['name'],
                    'group' => $permission['group'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }

     

        
        // Assign all permissions to the Admin role
        $adminRoleId = DB::table('roles')->where('name', 'Admin')->value('id');
        $permissions = DB::table('permissions')->pluck('id')->toArray();
        DB::table('role_permissions')->insert(
            array_map(function ($permissionId) use ($adminRoleId) {
                return ['role_id' => $adminRoleId, 'permission_id' => $permissionId, 'created_at' => now(), 'updated_at' => now()];
            }, $permissions)
        );

        // // Assign all permissions to the Admin role
        // $adminPermissions = Permission::all();
        // $RegisterPermissions = Permission::whereIn('group', ['Role', 'Permission'])->get();
        // $AssistantRegisterPermissions = Permission::whereIn('slug', ["assign_permission", "edit_permission"])->get();

        // $adminRole = Role::where('name', 'Super Admin')->first();
        // $RegisterRole = Role::where('name', 'Register')->first();
        // $AssistantRegisterRole = Role::where('name', 'Assistant Register')->first();

        // $adminRole->permissions()->sync($adminPermissions->pluck('id'));
        // $RegisterRole->permissions()->sync($RegisterPermissions->pluck('id'));
        // $AssistantRegisterRole->permissions()->sync($AssistantRegisterPermissions->pluck('id'));
    }
}
