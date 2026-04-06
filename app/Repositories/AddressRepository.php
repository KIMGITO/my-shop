<?php

namespace App\Repositories;

use App\Models\Address;

class AddressRepository extends BaseRepository
{
    public function __construct(Address $model)
    {
        parent::__construct($model);
    }

    public function toggleDefault($id)
    {
        $address = Address::findOrFail($id);

        Address::where('user_id', $address->user_id)
            ->update(['is_default' => false]);
        $address->update([
            'is_default' => true
        ]);

        return response()->json(['message' => 'Default address updated']);
    }
}
