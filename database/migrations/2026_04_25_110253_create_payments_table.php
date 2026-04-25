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
            $table->decimal('amount', 10, 2);
            $table->enum('method', array_column(PaymentMethods::cases(),  'value'))->default('mpesa');
            $table->enum('status', array_column(PaymentStatus::cases(), 'value'))->default('draft');
            $table->string('reference')->nullable();
            $table->string('transaction_code')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
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
