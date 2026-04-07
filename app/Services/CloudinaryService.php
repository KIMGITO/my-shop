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
            return ['url' => $result['secure_url'], 'public_id' => $result['public_ids']] ?? '';
        }

        $uploaded = [];
        foreach ($files as $fileItem) {
            $file = $fileItem instanceof UploadedFile ? $fileItem : ($fileItem['file'] ?? null);

            if (!$file) continue;

            $options = $folder ? ['folder' => $folder] : [];
            $result = $this->cloudinary->uploadApi()->upload($file->getRealPath(), $options);

            $uploaded[] = [
                'url' => $result['secure_url'] ?? '',
                'public_id'=>$result['public_id'] ?? '',
                'isMain' => ($mainFile && $file === $mainFile) ? 1 : ($fileItem['isMain'] ?? 0),
            ];
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
