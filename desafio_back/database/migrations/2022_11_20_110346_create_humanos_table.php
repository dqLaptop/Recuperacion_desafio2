<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHumanosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * @author manuel
     */
    public function up()
    {
        Schema::create('humanos', function (Blueprint $table) {
            $table->unsignedBigInteger('idU')->unique();
            $table->foreign('idU')->references('id')->on('users');
            $table->unsignedBigInteger('destino');
            $table->unsignedBigInteger('idD');
            $table->foreign('idD')->references('id')->on('users');
            $table->unsignedBigInteger('afinidad');
            $table->string('estado');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('humanos');
    }
}
