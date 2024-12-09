<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Compensation extends Model
{
    use HasFactory;

    protected $fillable = [
        'corporation_id',
        'substance_id',
        'year',
        'volume',
        'salary',
        'middle_concentration',
        'middle_year_concentration',
        'coefficient_villagers_count',
        'coefficient_national_economy',
        'calculated_compensation',
    ];

    protected $table = 'compensations';

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }

    public function corporation(): BelongsTo
    {
        return $this->belongsTo(Corporation::class);
    }

    public function substance(): BelongsTo
    {
        return $this->belongsTo(Substance::class);
    }
}
