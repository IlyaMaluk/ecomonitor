<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WaterCompensation extends Model
{
    use HasFactory;

    protected $fillable = [
        'corporation_id',
        'substance_id',
        'year',
        'category_coefficient',
        'regional_coefficient',
        'polution_mass',
        'indexated_loss',
        'calculated_water_compensation',
        'substance_count',
    ];

    protected $table = 'water_compensations';

    public function corporation(): BelongsTo
    {
        return $this->belongsTo(Corporation::class);
    }

    public function substance(): BelongsTo
    {
        return $this->belongsTo(Substance::class);
    }
}
