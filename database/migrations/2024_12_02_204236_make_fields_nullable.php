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
        Schema::table('logs', function (Blueprint $table) {
            $table->unsignedBigInteger('tax_type_id')->nullable()->change();
            $table->float('volume')->nullable()->change();
            $table->float('volume_spent')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('logs', function (Blueprint $table) {
            $table->unsignedBigInteger('tax_type_id')->change();
            $table->float('volume')->change();
            $table->float('volume_spent')->change();
        });
    }
};
