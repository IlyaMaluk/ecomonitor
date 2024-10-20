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
        'tax_type_id',
        'year',
        'volume',
        'volume_spent',
        'tax_rate',
    ];

    public function substance(): BelongsTo
    {
        return $this->belongsTo(Substance::class);
    }

    public function corporation(): BelongsTo
    {
        return $this->belongsTo(Corporation::class);
    }

    public function taxType(): BelongsTo
    {
        return $this->belongsTo(TaxType::class);
    }
}
