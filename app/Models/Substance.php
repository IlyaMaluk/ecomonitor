<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $title
 * @property string $class
 * @property float $rfc
 * @property float $c
 */
class Substance extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'class',
        'tlv',
        'rfc',
        'c'
    ];

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }
}
