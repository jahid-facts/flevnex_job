<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function(){
    Route::prefix("users")->group(function(){
        // user routes
        Route::get('/', [UserController::class, 'index'])->middleware(['role:Admin','permissions:view_user']);
        Route::get('find/{id}', [UserController::class, 'show'])->middleware('permissions:edit_user');
        Route::put('/{id}', [UserController::class, 'update'])->middleware('permissions:edit_user');
        Route::delete('/{id}', [UserController::class, 'destroy'])->middleware('permissions:delete_user');
        Route::get('/profile', [UserController::class, 'authUser']);
        Route::get('/user-role-permissions', [UserController::class, 'userRolePermissions']);
    });
});
