<?php

use App\Enums\CreditStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained()->cascadeOnDelete();
            $table->decimal('total_amount',10,2);
            $table->decimal('paid_amount',10,2)->default(0);
            $table->decimal('balance',10,2)->default(0);
            $table->enum('status', array_column(CreditStatus::cases(), 'value'))->default(CreditStatus::UNPAID->value);
            $table->timestamp('issued_at');
            $table->timestamp('due_date');
            $table->timestamp('last_payment');
            $table->text('notes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};
