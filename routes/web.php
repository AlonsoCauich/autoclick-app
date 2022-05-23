<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
Route::get('/', function () { return view('auth.login'); });
Route::get('/', function () { return view('welcome'); });
*/

Route::get("/", [AuthenticatedController::class, 'index']);
Route::post("login", [AuthenticatedController::class, 'login'])->name('login');
Route::get("/home", [AuthenticatedController::class, 'home'])->name('home');
Route::get("logout", [AuthenticatedController::class, 'logout'])->name('logout');
