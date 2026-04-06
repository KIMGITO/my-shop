<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Repositories\AddressRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    protected $addressRepo;


    public function __construct(AddressRepository $addressRepo)
    {
        $this->addressRepo = $addressRepo;
    }

    public function  index()
    {

        $addresses = $this->addressRepo->all();
        return Inertia::render('Settings/Address/Index', ['modalIsOpen' => false,  'addresses' => $addresses]);
    }

    public function create()
    {
        return Inertia::render('Settings/Address/Index', ['modalIsOpen' => true]);
    }

    public function store(AddressRequest $request)
    {
        $payload = $request->validated();
        $address = $this->addressRepo->create($payload);
    }
    public function update(AddressRequest $request, Address $address)
    {
        $payload = $request->validated();

        $updated = $this->addressRepo->update($address->id, $payload);
    }

    public function toggleDefault(Address $address)
    {
        $this->addressRepo->toggleDefault($address->id);
    }

    public function delete(Address $address)
    {
        $this->addressRepo->delete($address->id);
    }
}
