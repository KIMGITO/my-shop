<?php

use App\Services\CloudinaryService;
use Illuminate\Http\UploadedFile;

if (!function_exists('format_phone')) {
    function format_phone(string $phone): string
    {
        // Convert leading 0 to +254
        return preg_replace('/^0/', '+254', $phone);
    }
}

if (!function_exists('format_money')) {
    function format_money(float|int $amount): string
    {
        // Format as 2 decimal places
        return number_format($amount, 2);
    }
}

if (!function_exists('toCamel')) {
    function toCamel(array $data): array
    {
        $result = [];

        foreach ($data as $key => $value) {
            $camelKey = lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $key))));

            if (is_array($value)) {
                $value = toCamel($value);
            }

            $result[$camelKey] = $value;
        }

        return $result;
    }
}

if (!function_exists('to_snake')) {
    function to_snake(array $data): array
    {
        $result = [];

        foreach ($data as $key => $value) {
            // Convert camelCase key to snake_case
            $snakeKey = strtolower(preg_replace('/([a-z])([A-Z])/', '$1_$2', $key));

            // Recursively handle nested arrays
            if (is_array($value)) {
                $value = to_snake($value);
            }

            $result[$snakeKey] = $value;
        }

        return $result;
    }
}

if (!function_exists('extractImages')) {
    /**
     * Extract uploaded files from product images array and detect main image
     *
     * @param array $images Array of images like:
     * [
     *   ['file' => UploadedFile, 'isMain' => 1],
     *   ['file' => UploadedFile, 'isMain' => 0],
     * ]
     *
     * @return array ['files' => [UploadedFile, ...], 'main' => UploadedFile|null]
     */
    function extractImages(array $images): array
    {
        $files = [];
        $main = null;

        foreach ($images as $image) {

            if (!empty($image['file'])) {
                $files[] = $image['file'];

                if (!empty($image['isMain']) && $image['isMain']) {
                    $main = $image['file'];
                }
            }
        }

        return [
            'files' => $files,
            'main' => $main
        ];
    }
}

if (!function_exists('uploadImages')) {
    /**
     * Upload any array of images to Cloudinary
     *
     * @param array $images ['files'=>[UploadedFile,...],'main'=>UploadedFile|null]
     * @param string $folder Optional folder (default: 'uploads')
     * @return array [['url'=>..., 'isMain'=>1], ...]
     */
    function uploadImages(array $images, UploadedFile $mainImage,  string $folder): array
    {
        $cloudinary = new CloudinaryService();
        $uploaded = [];

        foreach ($images['files'] as $file) {
            $uploaded[] = [
                'url' => $cloudinary->upload($file, $folder),
                'isMain' => ($file === $mainImage) ? 1 : 0,
            ];
        }

        return $uploaded;
    }
}
