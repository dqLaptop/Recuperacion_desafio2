import * as bootstrap from 'bootstrap';
import '../styles.scss';
import { cargarLocalStorage } from './localStorage';
import { getPruebaRespuesta, resolverEleccion, getPruebaRespEleccion } from './pruebas-crud';
const datos = cargarLocalStorage('HumanoToken');
const token = datos.token;
let tBody;
let idResolver = "";

const crearTabla = () => {
    const html = `
    <table class="table">
        <thead>
            <tr class=contenido>
                <th scope="col">#</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Tipo</th>
                <th scope="col">Destino</th>
                <th scope="col">Dios</th>
                <th scope="col">Respuesta</th>
                <th scope="col">Realizada</th>
                <th scope="col">Resolver</th>
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
const crearFila = (prueba) => {
    let completada = "";
    if (prueba.finalizada === 1) {
        completada = "realizada";
    } else {
        completada = "pendiente";
    }
    const html = `
        <td scope="col"> ${prueba.idP} </td>
        <td scope="col"> ${prueba.descripcion} </td>
        <td scope="col"> ${prueba.tipo} </td>
        <td scope="col"> ${prueba.destino} </td>
        <td scope="col"> ${prueba.Dios} </td>
        <td scope="col"> ${prueba.valor} </td>
        <td scope="col"> ${completada} </td>

        <td scope="col"><button type="button" class="btn btn-primary resolver"data-bs-toggle="modal" data-bs-target="#modalResolver">Resolver</button></td>

    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tr.setAttribute('id', "A" + prueba.idP);

    tBody.appendChild(tr);

    document.querySelectorAll('.resolver').forEach(btn => {
        btn.addEventListener('click', functionResolver)
    });
}
const functionResolver = async (e) => {
    idResolver = e.target.parentNode.parentNode.id;
    let idP = idResolver.slice(1);
    let id = {
        "idP": idP
    }
    let pregunta = await getPruebaRespEleccion(id, token);
    document.querySelector("#textarea").value = pregunta.data[0].descripcion;

}
document.querySelector("#resolverPrueba").addEventListener('click', async () => {
    const data = new FormData(document.getElementById('formResolver'));
    let resp = data.get("valor");
    let valor = 0;
    if (resp === "primera") {
        valor = 1
    }
    let respuesta = {
        "valor": valor,
        "idU": datos.id_usuario,
        "idP": idResolver.slice(1)
    }
    let res = await resolverEleccion(respuesta, token);
    if (res.sucess) {
        crearMensaje(res.message);
    } else {
        crearMensaje(res.message);
    }
})
const crearMensaje = (cad) => {
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
const init = async () => {
    document.querySelector("#personajeRol").innerHTML = "Tu personaje es un humano";
    crearTabla();
    let id = {
        "id": datos.id_usuario
    }
    const prueba = await getPruebaRespuesta(id, token);
    prueba.data.forEach(p =>
        crearFila(p));
}
init();

