<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Facades\HandleResponseFacade as Response;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // User role permissions
    public function userRolePermissions()
    {
        try{
            $authId = Auth::user()->id;
            $user = User::findOrFail($authId);
            $data = new UserResource($user);
            return Response::sendResponse('User retrieved successfully.', $data);
        }
        catch(Exception $e){
            return Response::sendError('Error', $e->getMessage());
        }
    }

    // All user
    public function index()
    {
        try{
            $users = User::all();
            return Response::sendResponse('Users retrieved successfully.', $users);
        }
        catch(Exception $e){
            return Response::sendError('Error', $e->getMessage());
        }
    }

    // Auth user
    public function authUser()
    {
        try{
            $user = Auth::user();
            return Response::sendResponse('User retrieved successfully.', $user);
        }
        catch(Exception $e){
            return Response::sendError('Error', $e->getMessage());
        }
    }

    // Find user
    public function show($id)
    {
        $user = User::findOrFail($id);
        return Response::sendResponse('User retrieved successfully.', $user);
    }

    
    // up


}
