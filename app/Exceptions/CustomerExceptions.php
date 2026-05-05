<?php

namespace App\Exceptions;

use App\Traits\HandlesExceptionResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomerExceptions extends Exception
{
    use HandlesExceptionResponse;
    /**
     * Render the exception as an HTTP response.
     */
    public function render(Request $request)
    {
        return $this->errorResponse($request, $this->getMessage());
    }
}
