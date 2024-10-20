<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Corporation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'address',
        'type',
    ];

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }
}
