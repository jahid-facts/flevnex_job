<?php

namespace App\Http\Requests;

use App\Enums\BloodGroup;
use App\Enums\Gender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'gender' => ['required', new Enum(Gender::class)],
            'age' => 'required|integer|min:0',
            'blood_group' => ['required', new Enum(BloodGroup::class)],
        ];
    }
}
