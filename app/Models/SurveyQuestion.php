<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    protected $fillable = [
        'id',
        'type',
        'question',
        'description',  
        'data',
        'survey_id',
    ];
}
