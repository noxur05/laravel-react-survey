<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SurveyFactory extends Factory
{
    public function definition(): array
    {

    return [
        'title' => $this->faker->sentence(3),
        'description' => $this->faker->paragraph,
        'expire_date' => $this->faker->dateTimeBetween('now', '+1 day'),
        'image' => null,
        'status' => $this->faker->boolean(),
        'user_id' => 1,
    ];
    }
}
