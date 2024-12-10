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
        Schema::create('water_compensations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('corporation_id');
            $table->unsignedBigInteger('substance_id');
            $table->integer('year');
            $table->float('category_coefficient');
            $table->float('regional_coefficient');
            $table->float('polution_mass');
            $table->float('indexated_loss');
            $table->double('calculated_water_compensation');
            $table->integer('substance_count');
            $table->timestamps();
            $table->foreign('corporation_id')->references('id')->on('corporations');
            $table->foreign('substance_id')->references('id')->on('substances');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_compensations');
    }
};
