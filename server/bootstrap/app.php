<?php

use App\Http\Middleware\PermissionsMiddleware;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
        $middleware->alias([
            'role' => RoleMiddleware::class,
            'permissions' => PermissionsMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if($e->getPrevious() instanceof ModelNotFoundException){
                return response()->json([
                   'message' => 'Data not found.'
                ], 404);
            }
        });
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 401);
            }
        });
        $exceptions->render(function (ModelNotFoundException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Data not found.'
                ], 404);
            }
        });
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Record not found.'
                ], 404);
            }
        });
        $exceptions->render(function (RouteNotFoundException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Route not found.',
                ], 404);
            }
         });
         $exceptions->render(function (Exception $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 500);
            }
        });
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }
     
            return $response;
        });
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 404) {
                return back()->with([
                    'message' => 'The page you are looking for could not be found.',
                ]);
            }
            return $response;
        });
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 403) {
                return back()->with([
                    'message' => 'You do not have permission to access this page.',
                ]);
            }
            return $response;
        });
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 401) {
                return back()->with([
                    'message' => 'You must be logged in to access this page.',
                ]);
            }
            return $response;
        });
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 500) {
                return back()->with([
                    'message' => 'An internal server error occurred.',
                ]);
            }
            return $response;
        });
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 405) {
                return back()->with([
                    'message' => 'The page you are looking for could not be found.',
                ]);
            }
            return $response;
        });

        
    })->create();
