<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$permissions): Response
    {
        if(!$request->user()){
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        foreach ($permissions as $permission) {
            if (!$request->user()->hasPermission($permission)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return $next($request);
    }
}
