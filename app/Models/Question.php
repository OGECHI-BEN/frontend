<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Question extends Model
{
    protected $fillable = [
        'lesson_id',
        'question',
        'type',
        'question_text',
        'options',
        'correct_answer',
        'explanation',
        'points',
        'difficulty'
    ];

    protected $casts = [
        'options' => 'array',
        'points' => 'integer',
        'difficulty' => 'integer'
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function progress(): MorphMany // Change return type to MorphMany
    {
        return $this->morphMany(UserProgress::class, 'progressable');
    }
}
