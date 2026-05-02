<?php

use App\Enums\PaymentMethods;
use App\Enums\PaymentStatus;
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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount_due', 10, 2);
            $table->decimal('amount_paid',10,2);
            $table->decimal('change_given',10,2)->default(0);
            $table->enum('method', array_column(PaymentMethods::cases(),  'value'))->default(PaymentMethods::MPESA->value);
            $table->enum('status', array_column(PaymentStatus::cases(), 'value'))->default(PaymentStatus::PENDING->value);
            $table->string('reference')->nullable();
            $table->string('transaction_code')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('method');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
