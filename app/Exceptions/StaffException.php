<?php

namespace App\Exceptions;

use App\Traits\HandlesExceptionResponse;
use Exception;
use Illuminate\Http\Request;

class StaffException extends Exception
{
    use HandlesExceptionResponse;
    public function render(Request $request){
        $this->errorResponse($request, $this->getMessage());
    }
}
