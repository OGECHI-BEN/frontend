<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Lesson;
use App\Models\Quiz;
use App\Models\UserProgress;
use App\Models\UserQuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LearningController extends Controller
{
    public function getLanguages()
    {
        $languages = Language::with(['lessons', 'quizzes'])->get();
        return response()->json($languages);
    }

    public function getLessonsByLanguage($languageSlug)
    {
        $language = Language::where('slug', $languageSlug)->firstOrFail();
        $lessons = Lesson::where('language_id', $language->id)
            ->with(['level', 'userProgress' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->orderBy('level_id')
            ->orderBy('order')
            ->get();

        return response()->json($lessons);
    }

    public function getLesson($languageSlug, $lessonSlug)
    {
        $language = Language::where('slug', $languageSlug)->firstOrFail();
        $lesson = Lesson::where('language_id', $language->id)
            ->where('slug', $lessonSlug)
            ->with(['level', 'language'])
            ->firstOrFail();

        $userProgress = UserProgress::where('user_id', Auth::id())
            ->where('lesson_id', $lesson->id)
            ->first();

        $nextLesson = $lesson->getNextLesson();
        $previousLesson = $lesson->getPreviousLesson();

        return response()->json([
            'lesson' => $lesson,
            'user_progress' => $userProgress,
            'navigation' => [
                'next' => $nextLesson,
                'previous' => $previousLesson,
            ],
        ]);
    }

    public function completeLesson(Request $request, $languageSlug, $lessonSlug)
    {
        $language = Language::where('slug', $languageSlug)->firstOrFail();
        $lesson = Lesson::where('language_id', $language->id)
            ->where('slug', $lessonSlug)
            ->firstOrFail();

        $userProgress = UserProgress::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'lesson_id' => $lesson->id,
            ],
            [
                'completed' => true,
                'points_earned' => $lesson->points,
                'completed_at' => now(),
            ]
        );

        return response()->json($userProgress);
    }

    public function getQuizzesByLanguage($languageSlug)
    {
        $language = Language::where('slug', $languageSlug)->firstOrFail();
        $quizzes = Quiz::where('language_id', $language->id)
            ->with(['level', 'questions.answers'])
            ->get();

        return response()->json($quizzes);
    }

    public function getQuiz($languageSlug, $quizId)
    {
        $language = Language::where('slug', $languageSlug)->firstOrFail();
        $quiz = Quiz::where('language_id', $language->id)
            ->with(['questions.answers'])
            ->findOrFail($quizId);

        return response()->json($quiz);
    }

    public function submitQuiz(Request $request, $languageSlug, $quizId)
    {
        $language = Language::where('slug', $languageSlug)->firstOrFail();
        $quiz = Quiz::where('language_id', $language->id)
            ->with('questions')
            ->findOrFail($quizId);

        $answers = $request->input('answers');
        $score = 0;
        $correctAnswers = 0;

        foreach ($quiz->questions as $question) {
            if (isset($answers[$question->id])) {
                $answer = $question->answers()
                    ->where('id', $answers[$question->id])
                    ->where('is_correct', true)
                    ->first();

                if ($answer) {
                    $score += $question->points;
                    $correctAnswers++;
                }
            }
        }

        $passed = ($score / $quiz->getTotalPoints()) * 100 >= $quiz->passing_score;
        $pointsEarned = $passed ? $quiz->points : 0;

        $attempt = UserQuizAttempt::create([
            'user_id' => Auth::id(),
            'quiz_id' => $quiz->id,
            'score' => $score,
            'points_earned' => $pointsEarned,
            'passed' => $passed,
            'started_at' => $request->input('started_at'),
            'completed_at' => now(),
        ]);

        foreach ($answers as $questionId => $answerId) {
            $question = $quiz->questions()->find($questionId);
            $isCorrect = $question->answers()
                ->where('id', $answerId)
                ->where('is_correct', true)
                ->exists();

            $attempt->answers()->create([
                'question_id' => $questionId,
                'answer_id' => $answerId,
                'is_correct' => $isCorrect,
            ]);
        }

        return response()->json([
            'attempt' => $attempt,
            'score' => $score,
            'total_points' => $quiz->getTotalPoints(),
            'passed' => $passed,
            'points_earned' => $pointsEarned,
        ]);
    }
} 