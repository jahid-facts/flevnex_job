<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Permission extends Model
{
    use HasFactory;

    
    protected $fillable = ['name'];

    // relationship role and permissions
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }




}
