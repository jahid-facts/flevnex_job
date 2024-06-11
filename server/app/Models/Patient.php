<?php

namespace App\Models;

use App\Enums\BloodGroup;
use App\Enums\Gender;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'gender',
        'age',
        'blood_group',
    ];

    protected $casts = [
        'gender' => Gender::class,
        'blood_group' => BloodGroup::class,
    ];
}
