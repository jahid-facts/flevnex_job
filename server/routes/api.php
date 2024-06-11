<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Require Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/api/auth.php';
require __DIR__.'/api/users.php';
require __DIR__.'/api/authorization.php';


/*
|--------------------------------------------------------------------------
| Open Routes
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('patients')->group(function () {
        Route::get('/', [PatientController::class, 'index']);
        Route::post('/', [PatientController::class, 'store']);
        Route::get('/{patient}', [PatientController::class, 'show']);
        Route::put('/{patient}', [PatientController::class, 'update']);
        Route::delete('/{patient}', [PatientController::class, 'destroy']);
    });

});


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/