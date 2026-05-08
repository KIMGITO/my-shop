<?php

namespace App\Http\Controllers;

use App\Exceptions\PermissionException;
use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionToggleRequest;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function toggle(PermissionToggleRequest $request){
        $validated = $request->validated();

        $role = Role::findByName($request->role);

        if($role->name == 'admin'){
            throw new PermissionException("Can't change administrators permissions. They should have all rights.");

            return response()->json(['success' =>  false, 'message' => "Can't change administrators permissions. They should have all rights."]);
        }

        if ($validated['status']) {
            $role->givePermissionTo($validated['permission']);
        } else {
            $role->revokePermissionTo($validated['permission']);
        }

        return redirect()->back();
    }
}
