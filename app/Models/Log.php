<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'corporation_id',
        'substance_id',
        'year',
        'volume',
        'volume_spent',
        'water_taxes',
        'air_taxes',
    ];

    public function substance(): BelongsTo
    {
        return $this->belongsTo(Substance::class);
    }

    public function corporation(): BelongsTo
    {
        return $this->belongsTo(Corporation::class);
    }
}
