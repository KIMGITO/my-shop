<?php

namespace App\Services;

use App\Repositories\Inventory\SupplierRepository;
use Throwable;

class SupplierService
{


    protected $supplierRepository;
    protected $cloudinaryService;


    public function __construct(SupplierRepository $supplierRepository, CloudinaryService $cloudinaryService)
    {
        $this->supplierRepository = $supplierRepository;
        $this->cloudinaryService = $cloudinaryService;
    }


    public function storeData(array $payload)
    {
        try { // store image
            $logo = $payload['logo'];
            $uploaded = $this->cloudinaryService->upload($logo, 'upload/suppliers');
            $url = $uploaded['url'];
            $publicId = $uploaded['public_id'];

            // store data with updated logo url

            $payload['logo'] = $url;
            $payload['logo_id'] = $publicId;

            dd($payload);
            $supplier = $this->supplierRepository->create($payload);
        } catch (Throwable $e) {
            dd($e);
        }
    }
}
