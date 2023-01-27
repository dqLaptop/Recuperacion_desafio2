import { crearPrueba, asignarPrueba, asignarTodos, obtenerPrueba, getPrueba, getPruebaEleccion, getPruebaPuntual, getPruebaRl, getPruebaValoracion, eliminarPrueba, modificarPrueba } from './pruebas-crud';
import { PruebaEleccion, PruebaPuntual, PruebaRespuestaLibre, PruebaValoracion } from '../Classes/index';
import { obtenerVivos } from './consulta-crud';
import { cargarLocalStorage } from './localStorage';
import { obtenerUsuario } from './crud-provider';
//-------------------------------------------------------------------------------------------
let tBody;
let tb;
let idAsignar = "";
const atributo = document.querySelector('#atributo');
const valorA = document.querySelector('#valorA');
const labelAtributo = document.querySelector('.atributo');
const labelValorA = document.querySelector('.valorA');
const labelDificultad = document.querySelector('.dificultad');
const labelAcierto = document.querySelector('.acierto');
const labelPalabras = document.querySelector('.palabras');
const dificultad = document.querySelector('#dificultad');
const palabras = document.querySelector('#palabras');
const acierto = document.querySelector('#porcentaje');
const cerrar = document.querySelectorAll(".cerrar");
let tipo = "";
let idModificar = "";
const datos = cargarLocalStorage('HumanoToken');
const token = datos.token;
//-------------------------------------------------------------------------------------------
const crearTabla = () => {
    const html = `
    <h4 class="mt-5">Pruebas</h4>
    <hr>
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col">#</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Tipo</th>
                <th scope="col">Destino</th>
                <th scope="col">Dios</th>
                <th scope="col">Modificar</th>
                <th scope="col">Asignar a ...</th>
                <th scope="col">Asignar a todos</th>
                <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody class="contenido">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#tabla').appendChild(div);
    tBody = document.querySelector('tbody');
}
const crearFilaPrueba = (prueba) => {
    const html = `
        <td scope="col"> ${prueba.id} </td>
        <td scope="col"> ${prueba.descripcion} </td>
        <td scope="col"> ${prueba.tipo} </td>
        <td scope="col"> ${prueba.destino} </td>
        <td scope="col"> ${prueba.idD} </td>

        <td scope="col"><button type="button" class="btn btn-primary modificar"data-bs-toggle="modal" data-bs-target="#modalPrueba">Modificar</button></td>
        <td scope="col"><button type="button" class="btn btn-primary asignarA" data-bs-toggle="modal" data-bs-target="#modalAsignacion">Asignar a ...</button></td>
        <td scope="col"><button type="button" class="btn btn-primary asignarTodos">Asignar a todos</button></td>
        <td scope="col"><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>

    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tr.setAttribute('id', "A" + prueba.id);

    tBody.appendChild(tr);

    document.querySelectorAll('.modificar').forEach(btn => {
        btn.addEventListener('click', functionModificar)
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', functionEliminar)
    });
    document.querySelectorAll('.asignarTodos').forEach(btn => {
        btn.addEventListener('click', functionAsignarTodos)
    });
    document.querySelectorAll('.asignarA').forEach(btn => {
        btn.addEventListener('click', functionCrearTabla)
    });
}

document.querySelector('#eleccion').addEventListener('click', () => {
    tipo = 'eleccion';
    document.querySelector('.save').classList.remove('desaparecer');
    document.querySelector('.guardar').classList.remove('aparecer');
    document.querySelector('.save').classList.add('aparecer');
    document.querySelector('.guardar').classList.add('desaparecer');
    labelValorA.classList.remove('desaparecer');
    labelValorA.classList.add('aparecer');
    valorA.classList.remove('desaparecer');
    valorA.classList.add('aparecer');
});
document.querySelector('#valoracion').addEventListener('click', () => {
    tipo = 'valoracion';
    document.querySelector('.save').classList.remove('desaparecer');
    document.querySelector('.guardar').classList.remove('aparecer');
    document.querySelector('.save').classList.add('aparecer');
    document.querySelector('.guardar').classList.add('desaparecer');
    labelAtributo.classList.remove('desaparecer');
    labelAtributo.classList.add('aparecer');
    atributo.classList.remove('desaparecer');
    atributo.classList.add('aparecer');
});
document.querySelector('#puntual').addEventListener('click', () => {
    tipo = 'puntual';
    document.querySelector('.save').classList.remove('desaparecer');
    document.querySelector('.guardar').classList.remove('aparecer');
    document.querySelector('.save').classList.add('aparecer');
    document.querySelector('.guardar').classList.add('desaparecer');
    labelAtributo.classList.remove('desaparecer');
    labelAtributo.classList.add('aparecer');
    atributo.classList.remove('desaparecer');
    atributo.classList.add('aparecer');
    labelDificultad.classList.remove('desaparecer');
    labelDificultad.classList.add('aparecer');
    dificultad.classList.remove('desaparecer');
    dificultad.classList.add('aparecer');
});
document.querySelector('#respuesta_libre').addEventListener('click', () => {
    tipo = 'respuesta libre';
    document.querySelector('.save').classList.remove('desaparecer');
    document.querySelector('.guardar').classList.remove('aparecer');
    document.querySelector('.save').classList.add('aparecer');
    document.querySelector('.guardar').classList.add('desaparecer');

    labelPalabras.classList.remove('desaparecer');
    labelPalabras.classList.add('aparecer');
    palabras.classList.remove('desaparecer');
    palabras.classList.add('aparecer');
    labelAcierto.classList.remove('desaparecer');
    labelAcierto.classList.add('aparecer');
    acierto.classList.remove('desaparecer');
    acierto.classList.add('aparecer');

});

const init = async () => {
    let u = await obtenerUsuario(datos.id_usuario, token);
    obtenerRol(u);
    crearTabla();
    const pruebas = await getPrueba(token);
    pruebas.forEach(p =>
        crearFilaPrueba(p));

}
const obtenerRol = async (u) => {
    let divRol = document.querySelector("#personajeRol");
    if (u.data['idR'] === 1) {
        divRol.innerHTML = "Tu personaje es un humano";
    } else {
        if (u.data['idR'] === 2) {
            divRol.innerHTML = "Tu personaje es un dios";
        } else {
            if (u.data['idR'] === 3) {
                divRol.innerHTML = "Tu personaje es Hades";
            }
        }
    }
}
document.querySelector('.save').addEventListener('click', async (e) => {
    const data = new FormData(document.getElementById('formPrueba'));
    let info = cargarLocalStorage('HumanoToken');
    let id_usu = info.id_usuario;
    let p;
    if (tipo === 'eleccion') {
        p = new PruebaEleccion(data.get('descripcion'), data.get('destino'), tipo, id_usu, data.get('valorA'));
    } else {
        if (tipo === 'valoracion') {
            p = new PruebaValoracion(data.get('descripcion'), data.get('destino'), tipo, id_usu, data.get('atributo'));
        } else {
            if (tipo === 'puntual') {
                p = new PruebaPuntual(data.get('descripcion'), data.get('destino'), tipo, id_usu, data.get('atributo'), data.get('dificultad'));
            } else {
                if (tipo === 'respuesta libre') {
                    p = new PruebaRespuestaLibre(data.get('descripcion'), data.get('destino'), tipo, id_usu, data.get('palabras'), data.get('acierto'));
                }
            }
        }
    }

    crearPrueba(p, token).then((res) => {
        if (res.message === 'Creada') {
            crearFilaPrueba(res.data);
            mostrarMensajeModal("Prueba creada");
        }
    }).catch((err) => { console.log(err); e.preventDefault(); mostrarMensajeModal("No se ha podido crear la prueba"); });
});
const functionModificar = async (e) => {
    document.querySelector('.save').classList.remove('aparecer');
    document.querySelector('.guardar').classList.remove('desaparecer');
    document.querySelector('.save').classList.add('desaparecer');
    document.querySelector('.guardar').classList.add('aparecer');
    idModificar = e.target.parentNode.parentNode.id;
    let prueba = await obtenerPrueba(idModificar.slice(1), token);
    document.querySelector('#descripcion').value = prueba.descripcion;
    document.querySelector('#destino').value = prueba.destino;

    if (prueba.tipo === "valoracion") {
        labelAtributo.classList.remove('desaparecer');
        labelAtributo.classList.add('aparecer');
        atributo.classList.remove('desaparecer');
        atributo.classList.add('aparecer');

        let valoracion = await getPruebaValoracion(idModificar.slice(1), token);
        atributo.value = valoracion.atributo;
    } else {
        if (prueba.tipo === "respuesta libre") {
            labelPalabras.classList.remove('desaparecer');
            labelPalabras.classList.add('aparecer');
            palabras.classList.remove('desaparecer');
            palabras.classList.add('aparecer');
            labelAcierto.classList.remove('desaparecer');
            labelAcierto.classList.add('aparecer');
            acierto.classList.remove('desaparecer');
            acierto.classList.add('aparecer');

            let rl = await getPruebaRl(idModificar.slice(1), token);
            palabras.value = rl.palabras_clave;
            acierto.value = rl.acierto;

        } else {
            if (prueba.tipo === 'eleccion') {
                labelValorA.classList.remove('desaparecer');
                labelValorA.classList.add('aparecer');
                valorA.classList.remove('desaparecer');
                valorA.classList.add('aparecer');
                let eleccion = await getPruebaEleccion(idModificar.slice(1), token);
                valorA.value = eleccion.valor_atributo;
            } else {
                if (prueba.tipo === 'puntual') {
                    labelAtributo.classList.remove('desaparecer');
                    labelAtributo.classList.add('aparecer');
                    atributo.classList.remove('desaparecer');
                    atributo.classList.add('aparecer');
                    labelDificultad.classList.remove('desaparecer');
                    labelDificultad.classList.add('aparecer');
                    dificultad.classList.remove('desaparecer');
                    dificultad.classList.add('aparecer');

                    let puntual = await getPruebaPuntual(idModificar.slice(1), token);
                    atributo.value = puntual.atributo;
                    dificultad.value = puntual.dificultad;

                }
            }
        }
    }
}
document.querySelector('.guardar').addEventListener('click', async (e) => {
    //const data = new FormData(document.getElementById('formPrueba')); si lo empleo se queda la prueba undefined
    let prueba = await obtenerPrueba(idModificar.slice(1), token);
    let info = cargarLocalStorage('HumanoToken');
    let id_usu = info.id_usuario;
    let p;

    //Evita hacer esta estructura de codigo espaguetti!!!
    if (prueba.tipo === 'eleccion') {
        //p = new PruebaEleccion(data.get('descripcion'), data.get('destino'), prueba.tipo, id_usu, data.get('valorA')); 
        p = new PruebaEleccion(descripcion.value, destino.value, prueba.tipo, id_usu, valorA.value);
    } else {
        if (prueba.tipo === 'valoracion') {
            //p = new PruebaValoracion(data.get('descripcion'), data.get('destino'), prueba.tipo, id_usu, data.get('atributo'));
            p = new PruebaValoracion(descripcion.value, destino.value, prueba.tipo, id_usu, atributo.value);
        } else {
            if (prueba.tipo === 'puntual') {
                p = new PruebaPuntual(descripcion.value, destino.value, prueba.tipo, id_usu, atributo.value, dificultad.value);
            } else {
                if (prueba.tipo === 'respuesta libre') {
                    p = new PruebaRespuestaLibre(descripcion.value, destino.value, prueba.tipo, id_usu, palabras.value, acierto.value);
                }
            }
        }
    }
    modificarPrueba(idModificar.slice(1), p, token).then((res) => {
        if (res.message === "Modificada") {
            crearFilaPrueba(res.data);
            document.querySelector("#" + idModificar).remove(document.querySelector("#" + idModificar));
            mostrarMensajeModal("Se ha modificado la prueba");

        } else {
            mostrarMensajeModal("No se pudo modificar");
        }
    }).catch((err) => {
        console.log(err);
        mostrarMensaje("No se pudo modificar");
    });
});
const functionAsignarTodos = async (e) => {
    let idP = e.target.parentNode.parentNode.id;
    let id = {
        idP: idP.slice(1)
    }
    let respuesta = await asignarTodos(id, token);
    if (respuesta.sucess) {
        mostrarMensaje("Se ha asignado la prueba a " + respuesta.data.add.length + " humanos y no se ha podido asignar a " + respuesta.data.excluidos.length + " humanos debido a que ya tienen la prueba o todavia no la han realizado");
    } else {
        mostrarMensaje("No se ha podido asignar la prueba");
    }
}
document.querySelector(".Asignar").addEventListener('click', async (e) => {
    let checkbox = document.querySelectorAll(".checkbox");
    let id = [];
    for (let index = 0; index < checkbox.length; index++) {
        if (checkbox[index].checked) {
            id.push(checkbox[index].id.slice(1));
        }
    }
    let asignar = {
        idU: id,
        idP: idAsignar.slice(1)
    }
    let res = await asignarPrueba(asignar, token);
    if (res.sucess) {
        crearMensaje("Se ha asignado la prueba a " + res.data.add + " y no se ha podido asignar a " + res.data.excluidos + " debido a que ya tienen la prueba o todavia no la han realizado");
    } else {
        crearMensaje("No se ha podido asignar la prueba a nadie");
    }

});
const crearMensaje = (cad) => {
    let html =
        ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <p>${cad}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    document.querySelector('#resp').innerHTML = document.querySelector('#resp').innerHTML + html;
}
const mostrarMensajeModal = (cad) => {
    let html =
        ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <p>${cad}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    document.querySelector('#respuestaModal').innerHTML = document.querySelector('#respuestaModal').innerHTML + html;
}

const eliminarTabla = () => {
    let tabla = document.querySelector("#K");
    document.querySelector("#tablaUsu").removeChild(tabla);
}
const functionEliminar = async (e) => {
    let id = e.target.parentNode.parentNode.id;
    let respuesta = await eliminarPrueba(id.slice(1), token);
    if (respuesta === 'Borrado') {
        e.target.parentNode.parentNode.remove(document.querySelector('#' + id));
    } else {
        mostrarMensaje('Lo siento, pero la prueba seleccionada no se ha podido borrar');
    }
}
const mostrarMensaje = (cad) => {
    let html =
        ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <p>${cad}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    document.querySelector('#respModal').innerHTML = document.querySelector('#respModal').innerHTML + html;
}
const functionCrearTabla = async (e) => {
    idAsignar = e.target.parentNode.parentNode.id;
    crearTablaUsuarios();
    const usu = await obtenerVivos(token);
    usu.data.forEach(u =>
        crearFilaUsuarios(u));
}
const crearTablaUsuarios = () => {
    const html = `
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col"></th>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Sabiduria</th>
                <th scope="col">Nobleza</th>
                <th scope="col">Virtud</th>
                <th scope="col">Maldad</th>
                <th scope="col">Astucia</th>
                <th scope="col">Dios Afín</th>
                <th scope="col">Destino</th>
                <th scope="col">Estado</th>
            </tr>
        </thead>
        <tbody id="tb" class="contenido">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    div.setAttribute('id', 'K');
    document.querySelector('#tablaUsu').appendChild(div);
    tb = document.querySelector('#tb');
}
const crearFilaUsuarios = (usuario) => {
    const html = `
        <td scope="col"> <input type="checkbox" class="checkbox" name="OlimpoUsu" id="Q${usuario.id}"/></td>
        <td scope="col"> ${usuario.id} </td>
        <td scope="col"> ${usuario.nombre} </td>
        <td scope="col"> ${usuario.email} </td>
        <td scope="col"> ${usuario.sabiduria} </td>
        <td scope="col"> ${usuario.nobleza} </td>
        <td scope="col"> ${usuario.virtud} </td>
        <td scope="col"> ${usuario.maldad} </td>
        <td scope="col"> ${usuario.astucia} </td>
        <td scope="col"> ${usuario.diosAfin} </td>
        <td scope="col"> ${usuario.destino} </td>
        <td scope="col"> ${usuario.estado} </td>

    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tr.setAttribute('id', "B" + usuario.id);

    tb.appendChild(tr);
}
document.querySelectorAll(".cierre").forEach(c => c.addEventListener('click', function () {
    eliminarTabla();
}));
cerrar.forEach(c => c.addEventListener('click', function () {
    document.querySelector('#descripcion').value = "";
    document.querySelector('#destino').value = "";
    atributo.value = "";
    dificultad.value = "";
    valorA.value = "";
    palabras.value = "";
    acierto.value = "";
    tipo = '';

    labelAtributo.classList.remove('aparecer');
    labelAtributo.classList.add('desaparecer');
    atributo.classList.remove('aparecer');
    atributo.classList.add('desaparecer');
    labelPalabras.classList.remove('aparecer');
    labelPalabras.classList.add('desaparecer');
    palabras.classList.remove('aparecer');
    palabras.classList.add('desaparecer');
    labelAcierto.classList.remove('aparecer');
    labelAcierto.classList.add('desaparecer');
    acierto.classList.remove('aparecer');
    acierto.classList.add('desaparecer');
    labelDificultad.classList.remove('aparecer');
    labelDificultad.classList.add('desaparecer');
    dificultad.classList.remove('aparecer');
    dificultad.classList.add('desaparecer');
    labelValorA.classList.remove('aparecer');
    labelValorA.classList.add('desaparecer');
    valorA.classList.remove('aparecer');
    valorA.classList.add('desaparecer');

}));

init();

