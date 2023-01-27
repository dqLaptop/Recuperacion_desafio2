<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParametrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * @author Manuel
     */
    public function up()
    {
        Schema::create('parametros', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('nombre');
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
        Schema::dropIfExists('parametros');
    }
}
