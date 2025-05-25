<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,avif|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',
        ], [
            'avatar.required' => 'Please select an avatar',
            'avatar.image' => 'The avatar must be an image file',
            'avatar.mimes' => 'The avatar must be a file of type: jpeg, png, jpg, gif, avif',
            'avatar.max' => 'The avatar size must not exceed 2MB',
            'avatar.dimensions' => 'The avatar dimensions must be between 100x100 and 1000x1000 pixels'
        ]);

        try {
            $avatarPath = null;
            if ($request->hasFile('avatar')) {
                // Generate a unique filename
                $extension = $request->file('avatar')->getClientOriginalExtension();
                $filename = Str::uuid() . '.' . $extension;
                
                // Store the file with the unique filename
                $avatarPath = $request->file('avatar')->storeAs(
                    'avatars',
                    $filename,
                    'public'
                );

                // Verify the file was stored successfully
                if (!$avatarPath) {
                    throw new \Exception('Failed to store avatar');
                }
            }

            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'avatar' => $avatarPath,
                'points' => 0, // Default points
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            // Get the full URL for the avatar
            $user->avatar = $avatarPath ? Storage::url($avatarPath) : null;

            return response()->json([
                'token' => $token,
                'user' => $user,
            ], 201);

        } catch (\Exception $e) {
            // If there's an error, delete the uploaded file if it exists
            if ($avatarPath && Storage::disk('public')->exists($avatarPath)) {
                Storage::disk('public')->delete($avatarPath);
            }
            
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Get the full URL for the avatar
        $user->avatar = $user->avatar ? Storage::url($user->avatar) : null;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        // Get the full URL for the avatar
        $user->avatar = $user->avatar ? Storage::url($user->avatar) : null;
        return response()->json($user);
    }
} 