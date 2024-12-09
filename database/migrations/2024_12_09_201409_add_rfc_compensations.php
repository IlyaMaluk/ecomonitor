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
        Schema::table('compensations', function (Blueprint $table) {
            $table->foreign('corporation_id')->references('id')->on('corporations');
            $table->foreign('substance_id')->references('id')->on('substances');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('compensations', function(Blueprint $table) {
            $table->dropForeign(['corporation_id', 'substance_id']);
        });
    }
};
