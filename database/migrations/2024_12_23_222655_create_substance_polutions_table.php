<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('substance_polutions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('substance_id');
            $table->foreign('substance_id')->references('id')->on('substances');
            $table->float('polution');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('substance_polutions');
    }
};
