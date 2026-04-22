<?php

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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->string('type');
            $table->string('source');//online web,  pos,  manual
            $table->enum('status',[
                'initiated',
                'active',
                'parked',
                'completed',
                'cancelled',
                'expired',
            ])->default('initiated');
            $table->foreignId('customer_id')->nullable()->constrained('users');
            $table->foreignId('user_id')->constrained();
            $table->decimal('total_amount', 12, 2)->default(0);
            $table->decimal('paid_amount', 12, 2)->default(0);
            $table->decimal('balance', 12, 2)->default(0);
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('tax', 12, 2)->default(0);
            $table->string('notes')->nullable();
            $table->timestamp('expires_at')->nullable();

            $table->timestamps();

            $table->index('status');
            $table->index('type');
            $table->index('source');
            $table->index('expires_at');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
