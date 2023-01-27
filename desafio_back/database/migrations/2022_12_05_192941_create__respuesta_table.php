<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestaTable extends Migration
{
    /**
     * Run the migrations.
     * @author Isabel
     * @return void
     */
    public function up()
    {
        Schema::create('respuesta', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idP');
            $table->foreign('idP')->references('id')->on('prueba')->onDelete('cascade');
            $table->unsignedBigInteger('idU');
            $table->foreign('idU')->references('id')->on('users');
            $table->string('valor');
            $table->boolean('realizada');
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
        Schema::dropIfExists('respuesta');
    }
}
