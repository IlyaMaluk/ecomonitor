<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubstancePolution extends Model
{
    protected $fillable = [
        'substance_id',
        'polution',
    ];

    public function substance(): BelongsTo
    {
        return $this->belongsTo(Substance::class);
    }
}
