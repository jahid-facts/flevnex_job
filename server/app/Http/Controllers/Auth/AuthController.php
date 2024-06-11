<?php

namespace App\Http\Controllers\Auth;

use App\Facades\HandleResponseFacade as Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Mail\EmailVerificationMail;
use App\Mail\ForgotPasswordMail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
   
    public function register(UserRequest $request)
    {
        try {
            $clientDomainUrl = $request->headers->get('referer');
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            if ($user) {
                $token = Str::random(60);
                $user->remember_token = $token;
                $user->save();
                $mailData = [
                    'email' => $user->email,
                    'name' => $user->name,
                    'link' => $clientDomainUrl . "verification-email" . "?token=" . $token,
                ];
            
                Mail::to($user->email)->queue(new EmailVerificationMail($mailData));

                $data['access_token'] =  $user->createToken("access_token")->plainTextToken;
                $data['user'] =  $user;
                return Response::sendResponse("User registered successfully", $data);
            }else{
                return Response::sendError('Error', ['error'=>'User not created']);
            }

        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }

        // resend email auth user
        public function resendEmailVerification(Request $request)
        {
            try {
                $user = auth()->user();
                $clientDomainUrl = $request->headers->get('referer');
                $user = User::where('email', $user->email)->first();
                if ($user) {
                    $token = Str::random(60);
                    $user->remember_token = $token;
                    $user->save();
                    $mailData = [
                        'email' => $user->email,
                        'name' => $user->name,
                        'link' => $clientDomainUrl. "verification-email". "?token=". $token,
                    ];
                
                    Mail::to($user->email)->queue(new EmailVerificationMail($mailData));
    
                    return Response::sendResponse("Email sent successfully");
                }else{
                    return Response::sendError('Error', ['error'=>'User not found']);
                }
    
            } catch (\Exception $e) {
                return Response::sendError('Error', $e->getMessage(), $e->getCode());
        
            }
        }
    

    // Email verification  
    public function emailVerification(Request $request)
    {
        try {
            $token = $request->token;
            $user = User::where('remember_token', $token)->first();
                
            if ($user) {
                $user->remember_token = null;
                $user->email_verified_at = now();
                $user->save();
                // Email verification successful
                return Response::sendResponse("Email verification successfully");
            }else{
                return Response::sendError('Email not verified', ['error'=>'The provided token are incorrect']);
            }

        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }

   
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return Response::sendError('Invalid credentials.', ['error'=>'The provided credentials are incorrect']);
            }
            $data['access_token'] =  $user->createToken("access_token")->plainTextToken;
            $data['user'] =  $user;
       
            return Response::sendResponse('User login successfully.', $data);

        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }
    

    // Logout user
    public function logout(Request $request)
    {
        try {
            // // Retrieve the token ID from the request
            // $tokenId = $request->user()->currentAccessToken()->id;
            
            // // Revoke the specific token
            // $request->user()->tokens()->where('id', $tokenId)->delete();
            
            $user = $request->user();
            $user->tokens()->delete(); // Invalidate all tokens associated with the user
            return Response::sendResponse("Successfully logged out");
        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }

    
    // User forgot password
    public function forgotPassword(Request $request)
    {
        try {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            $clientDomainUrl = $request->headers->get('referer');
            $user = User::where('email', $request->email)->first();
            if ($user) {
                $token = $user->createPasswordResetToken();
                $mailData = [
                    'email' => $user->email,
                    'name' => $user->name,
                    'link' => $clientDomainUrl . "reset-password" . "?token=" . $token,
                ];
                Mail::to($user->email)->queue(new ForgotPasswordMail($mailData));
                return Response::sendResponse("Password reset link sent successfully");
            }
            return Response::sendError('Invalid email', ['error'=>'The provided email are incorrect']);
        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }


    // User reset password
    public function resetPassword(Request $request)
    {
        try {
            $token = $request->token;

            $tokenRecord = DB::table('password_reset_tokens')
                ->where('token', $token)
                ->first();

            if (!$tokenRecord) {
                return Response::sendError('Invalid token', ['error'=>'The provided token are incorrect']);
            }

            $user = User::where('email', $tokenRecord->email)->first();

            if ($user && $tokenRecord->created_at > now()->subHours(2)) {
                $user->password = Hash::make($request->password);
                $user->save();
                // Password reset successful, delete the token
                DB::table('password_reset_tokens')->where('token', $token)->delete();
                return Response::sendResponse("Password reset successfully");
            }else{
                return Response::sendError('Invalid token', ['error'=>'The provided token are incorrect']);
            }

        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }

    // User change password
    public function changePassword(Request $request)
    {
        try {
            $user = $request->user();
            $user->password =  Hash::make($request->password);
            $user->save();
            return Response::sendResponse("Password changed successfully");
        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }

    // Refresh token refresh
    public function refreshToken(Request $request)
    {
        try {
            $user = $request->user();
            $data['access_token'] =  $user->createToken("access_token")->plainTextToken;
            $data['user'] =  $user;
            return Response::sendResponse('User login successfully.', $data);
        } catch (\Exception $e) {
            return Response::sendError('Error', $e->getMessage(), $e->getCode());
        }
    }


    
}
