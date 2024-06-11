<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // should be called PermissionsSeeder 
        $this->call([
            RolesSeeder::class,
            UsersSeeder::class,
            PermissionsSeeder::class,
            PermissionsSeeder::class,
            PatientSeeder::class,
        ]);

       
    }
}
