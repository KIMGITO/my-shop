<?php

if (!function_exists('format_phone')) {
    function format_phone($phone)
    {
        return preg_replace('/^0/', '+254', $phone);
    }
}

if (!function_exists('format_money')) {
    function format_money($amount)
    {
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

if (!function_exists('toSnake')) {
    function toSnake(array $data): array
    {
        $result = [];

        foreach ($data as $key => $value) {
            // Convert camelCase key to snake_case
            $snakeKey = strtolower(preg_replace('/([a-z])([A-Z])/', '$1_$2', $key));

            // Recursively handle nested arrays
            if (is_array($value)) {
                $value = toSnake($value);
            }

            $result[$snakeKey] = $value;
        }

        return $result;
    }
}
