<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePruebaEleccionTable extends Migration
{
    /**
     * Run the migrations.
     * @author Isabel
     * @return void
     */
    public function up()
    {
        Schema::create('prueba_eleccion', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idP');
            $table->foreign('idP')->references('id')->on('prueba')->onDelete('cascade');
            $table->unsignedBigInteger('valor_atributo');
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
        Schema::dropIfExists('prueba_eleccion');
    }
}
