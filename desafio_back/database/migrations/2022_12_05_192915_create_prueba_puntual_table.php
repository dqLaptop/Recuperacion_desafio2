<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePruebaPuntualTable extends Migration
{
    /**
     * Run the migrations.
     * @author Isabel
     * @return void
     */
    public function up()
    {
        Schema::create('prueba_puntual', function (Blueprint $table) {
            $table->id()->unique;
            $table->unsignedBigInteger('idP');
            $table->foreign('idP')->references('id')->on('prueba')->onDelete('cascade');
            $table->unsignedBigInteger('idA');
            $table->foreign('idA')->references('id')->on('atributos')->onDelete('no action');
            $table->unsignedBigInteger('dificultad');
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
        Schema::dropIfExists('prueba_puntual');
    }
}
