import * as bootstrap from 'bootstrap';
import '../styles.scss';
import { cargarLocalStorage } from './localStorage';
import { obtenerUsuario } from './crud-provider';
import { getUsuarios, addUsuariosMasivos, obtenerTartaro, obtenerVivos, modificarAtributos, obtenerAtributos } from './consulta-crud';
import { crearUsuario } from './crud-provider';
import { User } from '../Classes/User.class';

const datos = cargarLocalStorage('HumanoToken');
const token = datos.token;
let tBody;
let spanError = document.querySelector("span.error");
let cerrar = document.querySelectorAll(".cerrar");
let filtro = document.querySelector("#usuariosOlimpo");
let idUsuario = "";

const obtenerRol = async (u) => {
    let divRol = document.querySelector("#personajeRol");
    let divEliminar = document.querySelector('#divEliminarMasivo');
    if (u.data['idR'] === 1) {
        divRol.innerHTML = "Tu personaje es un humano";
    } else {
        if (u.data['idR'] === 2) {
            divRol.innerHTML = "Tu personaje es un dios";
            divEliminar.classList.remove("aparecer");
            divEliminar.classList.add("desaparecer");
            document.querySelector("#eliminarMasivo").disabled = true;
        } else {
            if (u.data['idR'] === 3) {
                divRol.innerHTML = "Tu personaje es Hades";
                divEliminar.classList.remove("desaparecer");
                divEliminar.classList.add("aparecer");
                document.querySelector("#eliminarMasivo").disabled = false;

            }
        }
    }
}
const getRol = async () => {
    let u = await obtenerUsuario(datos.id_usuario, token);
    let rol = u.data['idR'];
    return rol;
}
const init = async () => {
    let u = await obtenerUsuario(datos.id_usuario, token);
    obtenerRol(u);
    if (u.data['idR'] === 2) {
        crearTablaDios();
        const usuarios = await getUsuarios(token);
        usuarios.data.forEach(usu =>
            crearFilaDios(usu));
    } else {
        if (u.data['idR'] === 3) {
            crearTablaHades();
            const usuarios = await getUsuarios(token);
            usuarios.data.forEach(usu =>
                crearFilaHades(usu));
        }
    }
}
init();
const crearTablaDios = () => {
    const html = `
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Sabiduria</th>
                <th scope="col">Nobleza</th>
                <th scope="col">Virtud</th>
                <th scope="col">Maldad</th>
                <th scope="col">Astucia</th>
                <th scope="col">Dios Afín</th>
                <th scope="col">Destino</th>
                <th scope="col">Estado</th>
                <th scope="col">Modificar</th>
            </tr>
        </thead>
        <tbody class="contenido">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    div.setAttribute('id', 'X');
    document.querySelector('#tablaUsuarios').appendChild(div);
    tBody = document.querySelector('tbody');
}
const crearTablaHades = () => {
    const html = `
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Sabiduria</th>
                <th scope="col">Nobleza</th>
                <th scope="col">Virtud</th>
                <th scope="col">Maldad</th>
                <th scope="col">Astucia</th>
                <th scope="col">Dios Afín</th>
                <th scope="col">Destino</th>
                <th scope="col">Estado</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody class="contenido">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    div.setAttribute('id', 'Z');
    document.querySelector('#tablaUsuarios').appendChild(div);
    tBody = document.querySelector('tbody');
}
const crearFilaHades = (usuario) => {
    const html = `
        <td scope="col"> ${usuario.id} </td>
        <td scope="col"> ${usuario.nombre} </td>
        <td scope="col"> ${usuario.email} </td>
        <td scope="col"> ${usuario.rol} </td>
        <td scope="col"> ${usuario.sabiduria} </td>
        <td scope="col"> ${usuario.nobleza} </td>
        <td scope="col"> ${usuario.virtud} </td>
        <td scope="col"> ${usuario.maldad} </td>
        <td scope="col"> ${usuario.astucia} </td>
        <td scope="col"> ${usuario.diosAfin} </td>
        <td scope="col"> ${usuario.destino} </td>
        <td scope="col"> ${usuario.estado} </td>

        <td scope="col"><button type="button" class="btn btn-primary modificarAtr" data-bs-toggle="modal" data-bs-target="#modalAtributos">Modificar Atributos</button></td>
        <td scope="col"><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>

    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tr.setAttribute('id', "A" + usuario.id);

    tBody.appendChild(tr);
    document.querySelectorAll('.modificarAtr').forEach(btn => {
        btn.addEventListener('click', functionVerAtributos)
    });
    /*
        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', functionEliminar)
        });*/
}
const functionVerAtributos = async (e) => {
    idUsuario = e.target.parentNode.parentNode.id;
    let id = {
        "id": idUsuario.slice(1)
    }
    let atributos = await obtenerAtributos(id, token);
    document.querySelector('#sabiduriaMod').value = atributos.data[0];
    document.querySelector('#noblezaMod').value = atributos.data[1];
    document.querySelector('#virtudMod').value = atributos.data[2];
    document.querySelector('#maldadMod').value = atributos.data[3];
    document.querySelector('#astuciaMod').value = atributos.data[4];
}
document.querySelector('#addAtributos').addEventListener('click', async (e) => {
    const data = new FormData(document.getElementById('formAtributos'));
    let atributos = {
        "idU": idUsuario.slice(1),
        "atributos": [data.get("sabiduriaMod"), data.get("noblezaMod"), data.get("virtudMod"), data.get("maldadMod"), data.get("astuciaMod")]
    }
    let rol = await getRol();
    let res = await modificarAtributos(atributos, token);
    if (res.sucess) {
        crearMensaje("Los atributos se han modificado correctamente");
        if (rol === 3) {
            eliminarTablaHades();
        } else if (rol === 2) {
            eliminarTablaDios();
        }
        init();
    } else {
        crearMensaje("No se han podido modificar los atributos");
    }

});
const crearMensaje = (cad) => {
    const html = `
    <div id="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${cad}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
        `;
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector("#alertAtributos").appendChild(div);
}
const crearFilaDios = (usuario) => {
    const html = `
    <td scope="col"> ${usuario.id} </td>
    <td scope="col"> ${usuario.nombre} </td>
    <td scope="col"> ${usuario.email} </td>
    <td scope="col"> ${usuario.rol} </td>
    <td scope="col"> ${usuario.sabiduria} </td>
    <td scope="col"> ${usuario.nobleza} </td>
    <td scope="col"> ${usuario.virtud} </td>
    <td scope="col"> ${usuario.maldad} </td>
    <td scope="col"> ${usuario.astucia} </td>
    <td scope="col"> ${usuario.diosAfin} </td>
    <td scope="col"> ${usuario.destino} </td>
    <td scope="col"> ${usuario.estado} </td>

    <td scope="col"><button type="button" class="btn btn-primary modificarAtr" data-bs-toggle="modal" data-bs-target="#modalAtributos">Modificar Atributos</button></td>

`;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tr.setAttribute('id', "A" + usuario.id);

    tBody.appendChild(tr);

    document.querySelectorAll('modificarAtr').forEach(btn => {
        btn.addEventListener('click', functionVerAtributos);
    });
}
const eliminarTablaDios = () => {
    let tabla = document.querySelector("#X");
    document.querySelector("#tablaUsuarios").removeChild(tabla);
}
const eliminarTablaHades = () => {
    let tabla = document.querySelector("#Z");
    document.querySelector("#tablaUsuarios").removeChild(tabla);
}
document.querySelector("#inputHM").addEventListener('input', () => {
    if (document.querySelector("#inputHM").validity.valid) {
        spanError.innerHTML = '';
        spanError.className = 'error';
    } else {
        showErrorInputNumber();
    }
});
const showErrorInputNumber = () => {
    if (document.querySelector("#inputHM").validity.valueMissing) {
        spanError.textContent = 'Debe introducir un número.';
    } else if (document.querySelector("#inputHM").validity.rangeOverflow) {
        spanError.textContent = 'El valor maximo es de 100.'
    } else if (document.querySelector("#inputHM").validity.rangeUnderflow) {
        spanError.textContent = 'El valor minimo es de 1.'
    }
    spanError.className = 'error';
}
document.querySelector("#addM").addEventListener('click', async (e) => {
    const data = new FormData(document.getElementById('formHumanoMasivo'));
    let num = data.get('numeroM');
    let rol = await getRol();
    let res = await addUsuariosMasivos(num, token);
    if (res.success) {
        if (rol === 3) {
            eliminarTablaHades();
        } else {
            eliminarTablaDios();
        }
        init();
        crearAlert("Se han añdadido " + num + " humanos");
    } else {
        crearAlert("No se han podido añadir los humanos");
    }
});
document.querySelector("#addDios").addEventListener('click', async (e) => {
    const data = new FormData(document.getElementById('formDios'));
    let rol = await getRol();
    let usuario;
    if (data.get('borrado') === "no") {
        usuario = new User(data.get('name'), data.get('emailDios'), data.get('passwordDios'), 2);
    } else {
        usuario = new User(data.get('name'), data.get('emailDios'), data.get('passwordDios'), 3);
    }
    let res = await crearUsuario(usuario);
    if (res.success) {
        if (rol === 3) {
            eliminarTablaHades();
        } else {
            eliminarTablaDios();
        }
        init();
        crearAlert("Felicidades!! se ha añadido un dios");
    } else {
        crearAlert("No se ha podido añadir al dios");
    }
});
cerrar.forEach(c => c.addEventListener('click', function () {
    document.querySelector("#inputHM").value = "";
}))
const crearAlert = (cad) => {
    const html = `
    <div id="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${cad}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
        `;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector("#alert").appendChild(div);
}
filtro.addEventListener('change', async () => {
    let opcion = filtro.options[filtro.selectedIndex].text;
    let rol = await getRol();
    if (opcion === 'Tartaro' && rol === 3) {
        eliminarTablaHades();
        crearTablaHades();
        const usuarios = await obtenerTartaro(token);
        usuarios.data.forEach(u =>
            crearFilaHades(u));
    } else if (opcion === 'Tartaro' && rol === 2) {
        eliminarTablaDios();
        crearTablaDios();
        const usuarios = await obtenerTartaro(token);
        usuarios.data.forEach(u =>
            crearFilaDios(u));
    }
    if (opcion === 'Todos') {
        (rol === 3) ? eliminarTablaHades() : eliminarTablaDios();
        init();
    }
    if (opcion === 'Vivos' && rol === 3) {
        eliminarTablaHades();
        crearTablaHades();
        const usuarios = await obtenerVivos(token);
        usuarios.data.forEach(u =>
            crearFilaHades(u));
    } else if (opcion === 'Vivos' && rol === 2) {
        eliminarTablaDios();
        crearTablaDios();
        const usuarios = await obtenerVivos(token);
        usuarios.data.forEach(u =>
            crearFilaDios(u));
    }
});
