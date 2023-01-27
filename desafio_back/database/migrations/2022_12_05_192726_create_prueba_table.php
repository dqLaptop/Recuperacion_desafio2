<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePruebaTable extends Migration
{
    /**
     * Run the migrations.
     * @author Isabel
     * @return void
     */
    public function up()
    {
        Schema::create('prueba', function (Blueprint $table) {
            $table->id()->on;
            $table->string('descripcion');
            $table->string('tipo');
            $table->unsignedBigInteger('destino');
            $table->unsignedBigInteger('idD');
            $table->foreign('idD')->references('id')->on('users')->onDelete('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prueba');
    }
}
