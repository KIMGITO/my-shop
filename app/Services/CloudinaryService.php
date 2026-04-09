<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;

class CloudinaryService
{
    protected Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);
    }

    /**
     * Upload single file or array of files to Cloudinary
     *
     * @param UploadedFile|array $files Single file or array of files
     * @param string|null $folder Optional folder
     * @param UploadedFile|null $mainFile Optional main image if $files is array
     * @return string|array URL for single file or array of ['url'=>..., 'isMain'=>1|0]
     */
    public function upload(UploadedFile|array $files, ?string $folder = null, ?UploadedFile $mainFile = null): string|array
    {
        if ($files instanceof UploadedFile) {
            $options = $folder ? ['folder' => $folder] : [];
            $result = $this->cloudinary->uploadApi()->upload($files->getRealPath(), $options);
            return [
                'url' => $result['secure_url'],
                'public_id' => $result['public_id']
            ];
        }

        $uploaded = [];
        $mainFound = false;

        foreach ($files as $fileItem) {
            $file = $fileItem instanceof UploadedFile ? $fileItem : ($fileItem['file'] ?? null);
            if (!$file) continue;

            $options = $folder ? ['folder' => $folder] : [];
            $result = $this->cloudinary->uploadApi()->upload($file->getRealPath(), $options);

            $isMain = 0;

            // comparison to get main image
            if ($mainFile) {
                $currentName = trim($file->getClientOriginalName());
                $mainName = trim($mainFile->getClientOriginalName());
                $currentSize = $file->getSize();
                $mainSize = $mainFile->getSize();

                if ($currentName === $mainName && $currentSize === $mainSize) {
                    $isMain = 1;
                    $mainFound = true;
                }
            }

            // Fallback for data structure
            if (!$isMain && is_array($fileItem) && !empty($fileItem['isMain'])) {
                $isMain = 1;
                $mainFound = true;
            }

            $uploaded[] = [
                'url' => $result['secure_url'] ?? '',
                'public_id' => $result['public_id'] ?? '', 
                'is_main' => $isMain,
            ];
        }

        // FINAL SAFETY: If no image was marked as main, make the first one main 
        // This ensures your product images table ALWAYS has a 1 for at least one record.
        if (!$mainFound && count($uploaded) > 0) {
            $uploaded[0]['is_main'] = 1;
        }

        return $uploaded;
    }

    
    /**
     * Delete an image by public ID
     */
    public function delete(string $publicId): void
    {
        $this->cloudinary->uploadApi()->destroy($publicId);
    }
}
