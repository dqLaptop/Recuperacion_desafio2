import * as bootstrap from 'bootstrap';
import '../styles.scss';
import { cargarLocalStorage } from './localStorage';
import { Comentario } from '../Classes/index';
import { modificarComentario, generarEnvio, generarEnvioTodos, obtenerUsuarios, getComentarios, obtenerComentario, eliminarComentario, getComentariosLeidos, getComentariosNoLeidos, getComentariosConcretos } from './Hermes-crud';
import { obtenerUsuario } from './crud-provider';

const datos = cargarLocalStorage('HumanoToken');
const token = datos.token;
let tBody;
let fila;
const buscar = document.querySelector('#buscarComentario');
const select = document.querySelector("#comunicacion");
const emailU = document.querySelector("#emailU");
const enviar = document.querySelector("#enviar");
const enviarTodos = document.querySelector("#enviarTodos");
const asunto = document.querySelector("#motivo");
const mensaje = document.querySelector("#mensaje");
const cerrar = document.querySelectorAll(".cerrar");
const emailR = document.querySelectorAll(".emailR");
const divEleccionEmail = document.querySelector("#eleccionEmail");
const spanError=document.querySelectorAll(".invalid-feedback");

const crearTabla = () => {
    const html = `
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col">#</th>
                <th scope="col">Enviado por</th>
                <th scope="col">Para</th>
                <th scope="col">Asunto</th>
                <th scope="col">Ver comentario</th>
                <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody class="contenido">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    div.setAttribute('id', 'X');
    document.querySelector('#tablaMensaje').appendChild(div);
    tBody = document.querySelector('tbody');
}
const crearFilaComentario = (comentario) => {
    const html = `
        <td scope="col"> ${comentario.id} </td>
        <td scope="col"> ${comentario.emailP} </td>
        <td scope="col"> ${comentario.emailR} </td>
        <td scope="col"> ${comentario.asunto} </td>

        <td scope="col"><button type="button" class="btn btn-primary ver" data-bs-toggle="modal" data-bs-target="#modalVerComentario">Ver Comentario</button></td>
        <td scope="col"><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>

    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tr.setAttribute('id', "A" + comentario.id);

    tBody.appendChild(tr);

    document.querySelectorAll('.ver').forEach(btn => {
        btn.addEventListener('click', functionVerComentario)
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', functionEliminar)
    });
}
const init = async () => {
    let u = await obtenerUsuario(datos.id_usuario, token);
    obtenerRol(u);
    crearTabla();
    let id = datos.id_usuario;
    const comentarios = await getComentarios(id, token);
    comentarios.forEach(c =>
        crearFilaComentario(c));
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

const functionEliminar = async (e) => {
    let id = e.target.parentNode.parentNode.id;
    let respuesta = await eliminarComentario(id.slice(1), token);
    if (respuesta === 'Borrado') {
        e.target.parentNode.parentNode.remove(document.querySelector('#' + id));
    } else {
        console.log('No se ha podido eliminar');
    }
}
const functionVerComentario = async (e) => {
    let idComentario = e.target.parentNode.parentNode.id;
    let c = await obtenerComentario(idComentario.slice(1), token);
    document.querySelector('#email').value = c.emailR;
    document.querySelector('#nombre').value = c.nombreR;
    document.querySelector('#asunto').value = c.asunto;
    document.querySelector('#comentario').value = c.comentario;
    let id = {
        "id": idComentario.slice(1)
    }
    let modificado = await modificarComentario(token, id);
    console.log(modificado);
}
const eliminarTabla = () => {
    let tabla = document.querySelector("#X");
    document.querySelector("#tablaMensaje").removeChild(tabla);
}
select.addEventListener('change', async () => {
    let opcion = select.options[select.selectedIndex].text;
    if (opcion === 'Leídos') {
        eliminarTabla();
        crearTabla();
        let id = datos.id_usuario;
        const comentarios = await getComentariosLeidos(id, token);
        comentarios.forEach(c =>
            crearFilaComentario(c));
    }
    if (opcion === 'Todos') {
        eliminarTabla();
        init();
    }
    if (opcion === 'No Leídos') {
        eliminarTabla();
        crearTabla();
        let id = datos.id_usuario;
        const comentarios = await getComentariosNoLeidos(id, token);
        comentarios.forEach(c =>
            crearFilaComentario(c));
    }
});
buscar.addEventListener('click', async () => {
    if (emailU.value.trim() === "") {
        crearAlertBuscador("Introducce un email");
    } else {
        let id = datos.id_usuario;
        let info = {
            "id": id,
            "email": emailU.value.trim()
        }
        const comentarios = await getComentariosConcretos(info, token);
        if (comentarios === "Error en la busqueda") {
            crearAlertBuscador("Comprueba el email introduccido");
        } else {
            eliminarTabla();
            crearTabla();
            comentarios.forEach(c =>
                crearFilaComentario(c));
        }
    }
});
const crearAlertBuscador = (p) => {
    const html = `
    <div id="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${p}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
        `;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector("#buscador").appendChild(div);
}
document.querySelectorAll('[name=respuesta]').forEach(r => r.addEventListener('change', function (e) {
    if (e.target.value === 'no') {
        divEleccionEmail.classList.remove("desaparecer");
        divEleccionEmail.classList.add("aparecer");
        enviar.classList.remove("desaparecer");
        enviar.classList.add("aparecer");
        enviarTodos.classList.remove("aparecer");
        enviarTodos.classList.add("desaparecer");
    } else {
        divEleccionEmail.classList.remove("aparecer");
        divEleccionEmail.classList.add("desaparecer");
        enviar.classList.remove("aparecer");
        enviar.classList.add("desaparecer");
        enviarTodos.classList.remove("desaparecer");
        enviarTodos.classList.add("aparecer");
    }
}));

emailR.forEach(email => email.addEventListener('input', () => {
    let emailError = document.querySelectorAll('span.error');
    if (email.validity.valid) {
        for (let index = 0; index < emailR.length; index++) {
            emailError[index].innerHTML = '';
            emailError[index].className = 'error';
        }
    } else {
        showError();
    }
}));
mensaje.addEventListener('input', () => {
    if (mensaje.validity.valid) {
        spanError[1].innerHTML = '';
        spanError[1].className = 'error';
    } else {
        showErrorMensaje();
    }
});

document.querySelector('#motivo').addEventListener('input', () => {
    if (document.querySelector('#motivo').validity.valid) {
        spanError[0].innerHTML = '';
        spanError[0].className = 'error';
    } else {
        showErrorAsunto();
    }
});
const showErrorAsunto = () => {
    if (document.querySelector('#motivo').validity.valueMissing) {
        spanError[0].textContent = 'Introduce un motivo para tu mensaje';
    } else {
        spanError[0].textContent = "";
    }
    spanError[0].className = 'error';
}

const showErrorMensaje = () => {
    if (mensaje.validity.valueMissing) {
        spanError[1].textContent = 'Introduce un mensaje';
    } else {
        spanError[1].textContent = "";
    }
    spanError[1].className = 'error';
}
const showError = () => {
    let emailError = document.querySelectorAll('span.error');
    for (let index = 0; index < emailR.length; index++) {
        if (emailR[index].validity.valueMissing) {
            emailError[index].textContent = 'Debe introducir una dirección de correo electrónico.';
        } else if (emailR[index].validity.typeMismatch) {
            emailError[index].textContent = 'El valor introducido debe ser una dirección de correo electrónico.'
        }
        emailError[index].className = 'error';
    }
}

enviar.addEventListener('click', (e) => {
    const data = new FormData(document.getElementById('formHermes'));
    let comentario = new Comentario(datos.id_usuario, data.getAll('emailR'), data.get('asunto'), data.get('mensaje'));
    generarEnvio(comentario, token).then(res => {
        if (res.sucess) {
            crearAlert("Se ha enviado correctamente");
        }
    }).catch(err => console.log(err), e.preventDefault(), crearAlert("No se ha podido enviar"));
    const emails = document.querySelectorAll(".emails");
    for (let index = 0; index < emails.length; index++) {
        document.querySelector("#contenedorEmail").removeChild(emails[index]);
    }
    functionDesmarcar();
    emailR[0].value = "";
    asunto.value = "";
    mensaje.value = "";
});

document.getElementById('enviarTodos').addEventListener('click', async (e) => {
    const data = new FormData(document.getElementById('formHermes'));
    let comentario = new Comentario(datos.id_usuario, null, data.get('asunto'), data.get('mensaje'));
    generarEnvioTodos(comentario, token).then(res => {
        if (res.sucess) {
            crearAlert("Se han enviado correctamente");
        }
    }).catch(err => {
        console.log(err);
        e.preventDefault();
        crearAlert("No se ha podido enviar");
    });
    const emails = document.querySelectorAll(".emails");
    for (let index = 0; index < emails.length; index++) {
        document.querySelector("#contenedorEmail").removeChild(emails[index]);
    }
    functionDesmarcar();
    emailR[0].value = "";
    asunto.value = "";
    mensaje.value = "";
});
cerrar.forEach(c => c.addEventListener('click', function () {
    const emails = document.querySelectorAll(".emails");
    for (let index = 0; index < emails.length; index++) {
        document.querySelector("#contenedorEmail").removeChild(emails[index]);
    }
    functionDesmarcar();
    emailR[0].value = "";
    asunto.value = "";
    mensaje.value = "";
    //document.querySelector("#alert").remove();
    eliminarTablaUsuario();
    for (let index = 0; index < emailR.length; index++) {
        emailR[index].required = 'false';
    }

}));


const crearAlert = (p) => {
    const html = `
    <div id="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${p}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
        `;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector("#modalContenido").appendChild(div);
}

const functionDesmarcar = () => {
    document.querySelectorAll('[name=respuesta]').forEach((radio) => radio.checked = false);
}

document.querySelector('#addEmail').addEventListener('click', async () => {
    crearEmail();
});

document.querySelector('#eliminarEmail').addEventListener('click', async () => {
    const emails = document.querySelectorAll(".emails");
    if (emails.length > 0) {
        document.querySelector("#contenedorEmail").removeChild(emails[emails.length - 1]);
    }
});
const crearEmail = () => {
    const input = `
    <input type="email" name="emailR" class="form-control mt-1 emailR"
    pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
    placeholder="Ex: pedro@gmail.com">
    <span class="error" aria-live="polite"></span>
    `;
    const div = document.createElement('div');
    div.innerHTML = input;
    div.setAttribute('class', 'emails');
    document.querySelector('#contenedorEmail').append(div);
    return div;
}
document.querySelector('#crearMensaje').addEventListener('click', async () => {
    crearTablaUsuarios();
    const usuarios = await obtenerUsuarios(token);
    usuarios.forEach(u =>
        crearFilaUsuario(u));
});
const crearTablaUsuarios = () => {
    const html = `
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col">#</th>
                <th scope="col">Nombre Usuario</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody id=tbody class="contenido">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.setAttribute('id', 'L');
    div.innerHTML = html;
    document.querySelector('#tablaUsuarios').appendChild(div);
    fila = document.querySelector('#tbody');
}
const crearFilaUsuario = (usuario) => {
    const html = `
        <td scope="col"> ${usuario.id} </td>
        <td scope="col"> ${usuario.nombre} </td>
        <td scope="col"> ${usuario.email} </td>

    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    fila.appendChild(tr);
}
const eliminarTablaUsuario = () => {
    let tabla = document.querySelector("#L");
    document.querySelector("#tablaUsuarios").removeChild(tabla);
}

init();