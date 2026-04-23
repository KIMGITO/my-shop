<?php

namespace App\DTOs;

use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Carbon as SupportCarbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

use function Illuminate\Support\now;

class CreateOrderData
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public TransactionType $type,
        public string $source,
        public OrderStatus $status,
        public ?int $customerId = null,
        public int $userId,
        public float $discount = 0,
        public float $tax = 0,
        public ?string $notes = null,
        public float $total_amount = 0,
        public float $paid_amount = 0,
        public float $balance = 0,
        public ?SupportCarbon $expires_at = null,
    ) {
        $this->expires_at = $expires_at ?? now()->addHours(24);
        $this->type = $type;
        $this->source = $source;
        $this->status = $status;
        $this->customerId = $customerId;
        $this->userId = $userId;
        $this->discount = $discount;
        $this->tax = $tax;
        $this->notes = $notes;
        $this->total_amount = $total_amount;
        $this->paid_amount = $paid_amount;
        $this->balance = $balance;
    }
}
