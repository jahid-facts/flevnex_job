<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Facades\HandleResponseFacade as Response;
use Exception;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   
    public function index(Request $request)
    {
        try {
            $searchText = $request->searchText;
            $perPage = $request->per_page ?? 10;

            $users = Patient::when($searchText, function ($query, $searchText) {
                $query->whereAny(
                    [
                        'name',
                        'email',
                        'phone',
                        'age',
                        'address',
                    ],
                    'LIKE',
                    "%$searchText%"
                );
            })->orderBy('id', 'DESC')->paginate($perPage);

            return PatientResource::collection($users);
        } catch (Exception $e) {
            return Response::json(['error' => 'Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $patient = Patient::create($request->validated());
    
        return response()->json([
            'success' => true,
            'message' => 'Patient created successfully.',
            'data' => new PatientResource($patient)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return new PatientResource($patient);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient->update($request->validated());
    
        return response()->json([
            'success' => true,
            'message' => 'Patient updated successfully.',
            'data' => new PatientResource($patient)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return response()->json(["message" => "Patient deleted successfully"], 204);
    }
}
