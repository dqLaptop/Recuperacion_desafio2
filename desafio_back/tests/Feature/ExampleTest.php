<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * @author Isabel
     */
    public function test_EncontrarPrueba()
    {
        $this->json('get', '/api/Prueba/obtener/1')
            ->assertStatus(200);
    }
    /**
     * @author Isabel
     */
    public function test_CrearPruebaIncorrecta()
    {
        $datos = [
            'descripcion' => '¿Dulce o saldado?',
            'destino' => 20,
            'tipo' => 'valoracion',
            'idD' => "",
            'valor_atributo' => 0
        ];
        $this->json('post', '/api/Prueba/crear', $datos)
            ->assertStatus(202)
            ->assertJson([
                'message' => 'Error al insertar',
            ]);
    }
    /**
     * @author Isabel
     */
    public function test_CrearPruebaCorrecta()
    {
        $datos = [
            'descripcion' => '¿Dulce o saldado?',
            'destino' => 20,
            'tipo' => 'eleccion',
            'idD' => 3,
            'valor_atributo' => 0
        ];
        $this->json('post', '/api/Prueba/crear', $datos)
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Creada',
            ]);
    }
    /**
     * @author Isabel
     */
    public function test_ModificarPrueba()
    {
        $datos = [
            'descripcion' => '¿Cultura o Belleza?',
            'destino' => 15,
            'tipo' => 'eleccion',
            'idD' => 4,
            'valor_atributo' => 0
        ];
        $this->json('put', '/api/Prueba/modificar/5', $datos)
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Modificada',
            ]);
    }
}
