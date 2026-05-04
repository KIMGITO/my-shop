<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

trait HandlesExceptionResponse
{
     protected function errorResponse(
        Request $request,
        string $message,
        int $status = 400
    ): JsonResponse|RedirectResponse {

        if ($request->header('X-Inertia')) {
            return redirect()->back()->with([
                'error' => $message,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => $message,
        ], $status);
    }

    protected function successResponse(
        Request $request,
        $data = [],
        string $message = 'Success',
        int $status = 200
    ): JsonResponse|RedirectResponse {

        if ($request->header('X-Inertia')) {
            return redirect()->back()->with([
                'success' => $message,
                'data' => $data,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }
}
