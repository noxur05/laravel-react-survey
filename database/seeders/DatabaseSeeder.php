<?php

namespace Database\Seeders;

use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'km@gmail.com',
            'password' => bcrypt('Admin123.')
        ]);


        Survey::factory(1000)->create();
    }
}
