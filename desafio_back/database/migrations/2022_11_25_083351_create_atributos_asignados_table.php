<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtributosAsignadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * @author Manuel
     */
    public function up()
    {
        Schema::create('atributos_asignados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idU');
            $table->foreign('idU')->references('id')->on('users');
            $table->unsignedBigInteger('idA');
            $table->foreign('idA')->references('id')->on('atributos');
            $table->unsignedBigInteger('valor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atributos_asignados');
    }
}
