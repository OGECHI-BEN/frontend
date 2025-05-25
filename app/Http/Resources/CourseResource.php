<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class CourseResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'difficulty' => $this->difficulty,
            'estimatedTime' => $this->estimated_time,
            'lessonsCount' => $this->lessons_count,
            'exercisesCount' => $this->exercises_count,
            'projectsCount' => $this->projects_count,
            'rating' => $this->rating,
            'modules' => ModuleResource::collection($this->whenLoaded('modules')),
            'userProgress' => $this->whenLoaded('userProgress', function () {
                return UserProgressResource::collection($this->userProgress);
            }),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
} 