<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    protected $fillable = [
        'language_id',
        'level_id',
        'title',
        'description',
        'time_limit_minutes',
        'passing_score',
        'points',
    ];

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function userAttempts(): HasMany
    {
        return $this->hasMany(UserQuizAttempt::class);
    }

    public function getTotalPoints()
    {
        return $this->questions()->sum('points');
    }
} 