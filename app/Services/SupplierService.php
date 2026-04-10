<?php

namespace App\Services;

use App\Models\Supplier;
use App\Repositories\Inventory\SupplierRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

    /**
     * transform suppliers data for display.
     */

    public function transformSuppliers(Collection $suppliers)
    {
        $transformedSuppliers = $suppliers->map(function ($supplier) {
            $supplierData = $supplier->except(['logo_url', 'logo_public_id']);

            return [
                ...$supplierData,
                'logo' => $supplier->toArray()['logo_url']
            ];
        })->toArray();

        return toCamel($transformedSuppliers);
    }

    /**
     * Store or Update Supplier Data
     */
    public function processSupplier(array $payload, $id = null)
    {

        try {
            return DB::transaction(function () use ($payload, $id) {
                $supplier = $id ? $this->supplierRepository->find($id) : null;
                $logoUrl = $supplier ? $supplier->image : null;
                $publicId = $supplier ? $supplier->public_id : null;

                if (($payload['remove_existing_logo'] ?? false) || isset($payload['logo'])) {
                    if ($publicId) {
                        $this->cloudinaryService->delete($publicId);
                        $logoUrl = null;
                        $publicId = null;
                    }
                }

                if (isset($payload['logo']) && $payload['logo'] instanceof \Illuminate\Http\UploadedFile) {
                    $uploaded = $this->cloudinaryService->upload($payload['logo'], 'suppliers');
                    $logoUrl = $uploaded['url'];
                    $publicId = $uploaded['public_id'];
                }

                $data = [
                    'name'      => $payload['name'],
                    'email'     => $payload['email'],
                    'phone'     => $payload['phone'],
                    'type'      => $payload['type'] ?? 'General',
                    'contact'   => $payload['contact'] ?? null,
                    'logo_url'     => $logoUrl,
                    'logo_public_id' => $publicId,
                ];

                if ($id) {
                    $supplier->update($data);
                    return $supplier;
                }

                return $this->supplierRepository->create($data);
            });
        } catch (Throwable $e) {
            Log::error("Supplier Service Error: " . $e->getMessage());
            throw $e;
        }
    }
}
