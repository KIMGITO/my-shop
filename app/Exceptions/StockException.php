<?php

namespace App\Exceptions;

use App\Traits\HandlesExceptionResponse;
use Exception;
use Illuminate\Http\Request;

class StockException extends Exception
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
