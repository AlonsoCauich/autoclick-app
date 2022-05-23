<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/checkInStation", [AuthenticatedController::class, 'checkInStation']);
Route::post("/checkOutStation", [AuthenticatedController::class, 'checkOutStation']);
Route::post("/infoCars", [AuthenticatedController::class, 'infoCars']);
Route::post("/login_front", [AuthenticatedController::class, 'login_front']);
//Route::get("/infoCars", [AuthenticatedController::class, 'infoCars']);
