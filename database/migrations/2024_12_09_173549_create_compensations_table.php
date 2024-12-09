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
        Schema::create('compensations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('corporation_id');
            $table->unsignedBigInteger('substance_id');
            $table->year('year');
            $table->float('volume');
            $table->float('salary');
            $table->float('middle_concentration');
            $table->float('middle_year_concentration');
            $table->integer('coefficient_villagers_count');
            $table->float('coefficient_national_economy');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compensations');
    }
};
