<?php

use App\Http\Controllers\CorporationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\SubstanceController;
use Illuminate\Support\Facades\Route;

Route::controller(CorporationController::class)->group(function() {
    Route::get('/corporations', 'create')
        ->name('corporations.create');

    Route::post('/corporations', 'store')
        ->name('corporations.store');

    Route::delete('/corporations/{id}', 'destroy')
        ->name('corporations.destroy');
});

Route::controller(SubstanceController::class)->group(function () {
    Route::get('/substances', 'create')
        ->name('substances.create');

    Route::post('/substances', 'store')
        ->name('substances.store');

    Route::delete('/substances/{id}', 'destroy')
        ->name('substances.destroy');
});

Route::controller(LogController::class)->group(function() {
    Route::post('/logs', 'store')
        ->name('logs.store');

    Route::put('/logs/{id}', 'update')
        ->name('logs.update');

    Route::delete('/logs/{id}', 'destroy')
        ->name('logs.destroy');
});

Route::get('/', [HomeController::class, 'index'])
    ->name('home.index');
