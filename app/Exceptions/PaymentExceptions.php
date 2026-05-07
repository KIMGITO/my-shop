<?php

namespace App\Exceptions;

use App\Traits\HandlesExceptionResponse;
use Exception;
use Illuminate\Http\Request;

class PaymentExceptions extends Exception
{
    use HandlesExceptionResponse;

    public function render(Request $request){
        return $this->errorResponse($request, $this->getMessage());
    }
}
