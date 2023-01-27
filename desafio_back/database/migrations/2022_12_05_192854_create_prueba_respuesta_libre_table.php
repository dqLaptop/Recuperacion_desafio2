<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePruebaRespuestaLibreTable extends Migration
{
    /**
     * Run the migrations.
     * @author Isabel
     * @return void
     */
    public function up()
    {
        Schema::create('prueba_respuesta_libre', function (Blueprint $table) {
            $table->id()->unique;
            $table->unsignedBigInteger('idP');
            $table->foreign('idP')->references('id')->on('prueba')->onDelete('cascade');
            $table->string('palabras_clave');
            $table->unsignedBigInteger('acierto');
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
        Schema::dropIfExists('prueba_respuesta_libre');
    }
}
