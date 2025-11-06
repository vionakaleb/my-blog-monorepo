<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /**
     * Create a new PostController instance.
     */
    public function __construct()
    {
        // This middleware protects your routes.
        // 'index' and 'show' are public.
        // 'store', 'update', 'destroy' require a user to be logged in.
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    /**
     * Display a paginated list of posts.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $posts = Post::with(['user' => function ($query) {
                        $query->select('id', 'name'); 
                     }])
                     ->latest()
                     ->paginate(10);

        $posts->getCollection()->transform(function ($post) {
            $post->author = $post->user;
            unset($post->user);
            return $post;
        });

        return response()->json($posts);
    }

    /**
     * Store a new post in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = $request->user()->posts()->create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        $post->load('user:id,name');
        $post->author = $post->user;
        unset($post->user);

        return response()->json($post, 201);
    }

    /**
     * Display the specified post.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Post $post)
    {
        $post->load('user:id,name');
        $post->author = $post->user;
        unset($post->user);

        return response()->json($post);
    }

    /**
     * Update the specified post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Post $post)
    {
        if (Gate::denies('update', $post)) {
             return response()->json(['message' => 'Forbidden. You do not own this post.'], 403);
        }
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post->update([
            'title' => $request->title,
            'content' => $request->content,
        ]);
        
        $post->load('user:id,name');
        $post->author = $post->user;
        unset($post->user);

        return response()->json($post);
    }

    /**
     * Remove the specified post.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        if (Gate::denies('delete', $post)) {
             return response()->json(['message' => 'Forbidden. You do not own this post.'], 403);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}