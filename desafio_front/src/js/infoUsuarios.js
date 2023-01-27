import * as bootstrap from 'bootstrap';
import '../styles.scss';
import { traerInfo } from './crud-provider';
import { hacerLogout } from './crud-provider';
import { cargarLocalStorage } from './localStorage';
import { limpiarLocalStorage } from './localStorage';
import { obtenerUsuario } from './crud-provider';

const tituloCard = document.querySelector('.cardHeaderInfo');
const cuerpoCard = document.querySelector('.cardBodyInfo');
const botonLogout = document.getElementById('botonLogout');
const botonPruebas = document.querySelector('#botonPruebas');
const botonHermes = document.querySelector('#btnHermes');
const botonConsulta = document.querySelector('#botonConsulta');
const informacion = cargarLocalStorage('HumanoToken');
const token=informacion.token
document.addEventListener("DOMContentLoaded", () => {
    let datos = cargarLocalStorage('HumanoToken');
    let token = datos.token;
    let divConsulta=document.querySelector("#tarjetaConsulta");
    let divRol = document.querySelector("#personajeRol");
    traerInfo(datos.id_usuario, token).then((respuesta) => {
        if (respuesta.sucess) {
            datos = respuesta.data;
            if (datos.rolUsuario == 1) {
                ponerNombreHumano(datos);
                mostrarAtributosHumano(datos);
                resumenDatosHumano(datos);
                divRol.innerHTML = "Tu personaje es un Humano"
                divConsulta.classList.remove("aparecer");
                divConsulta.classList.add("desaparecer");
            } else {
                if (datos.rolUsuario == 2) {
                    ponerNombreDios(datos);
                    mostrarAtributosDios(datos);
                    resumenDatosDios(datos);
                    divRol.innerHTML = "Tu personaje es un Dios"
                    divConsulta.classList.remove("desaparecer");
                    divConsulta.classList.add("aparecer");
                } else {
                    if (datos.rolUsuario == 3) {
                        ponerNombreDios(datos);
                        mostrarAtributosDios(datos);
                        resumenDatosDios(datos);
                        divRol.innerHTML = "Tu personaje es Hades";
                        divConsulta.classList.remove("desaparecer");
                        divConsulta.classList.add("aparecer");
                    }
                }
            }
        }
    });
});
export const getRol = async () => {
    let u = await obtenerUsuario(informacion.id_usuario, token);
    let rol = u.data['idR'];
    return rol;
}
botonPruebas.addEventListener('click',async () => {
    let rol=await getRol();
    if(rol===1){
        window.open('./UsuarioPruebas.html');
    }else{
        window.open('./IndexPruebas.html');
    }
});
botonHermes.addEventListener('click', () => {
    window.open('./Hermes.html');
});
botonConsulta.addEventListener('click', () => {
    window.open('./ConsultaIndex.html');
});

window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    //limpiarLocalStorage('HumanoToken');
});

botonLogout.addEventListener('click', () => {
    salirDelSistema();
});

const salirDelSistema = () => {
    let datos = cargarLocalStorage('HumanoToken');
    let email = datos.email;
    let pass = datos.pass;
    let usuario = { email: email, password: pass };
    hacerLogout(usuario).then((respuesta) => {
        limpiarLocalStorage('HumanoToken');
        window.open('../index.html', '_self');
    })
        .catch(() => {
            console.error("Error en usuario/Contraseña")
        });
}
const ponerNombreHumano = (datos) => {
    const html = `
    <div class="row">
        <div class="col-6">
            <h5>Nombre Humano:</h5>
        </div>
        <div class="col-6 text-end text-uppercase">
            <h5>${datos.nombreUsuario}</h5>
        </div>
            `;
    const tituloHumano = document.createElement('div');
    tituloHumano.innerHTML = html;
    tituloCard.appendChild(tituloHumano);
};

const mostrarAtributosHumano = (datos) => {
    const html = `
    <div class="atrib1">
    <div class="row">
        <h6 class="col-9">Sabiduria</h6>
        <div class="col-3">
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[0] * 20}%;" aria-valuenow="${datos.atributos[0] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[0]}</div>
    </div>
</div>

<div class="atrib2">
    <div class="row">
        <h6 class="col-9">Nobleza</h6>
        <div class="col-3">
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[1] * 20}%;" aria-valuenow="${datos.atributos[1] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[1]}</div>
    </div>
</div>

<div class="atrib3">
    <div class="row">
        <h6 class="col-9">Virtud</h6>
        <div class="col-3">
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[2] * 20}%;" aria-valuenow="${datos.atributos[2] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[2]}</div>
    </div>
</div>

<div class="atrib4">
    <div class="row">
        <h6 class="col-9">Maldad</h6>
        <div class="col-3">
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[3] * 20}%;" aria-valuenow="${datos.atributos[3] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[3]}</div>
    </div>
</div>

<div class="atrib5">
    <div class="row">
        <h6 class="col-9">Astucia</h6>
        <div class="col-3">
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[4] * 20}%;" aria-valuenow="${datos.atributos[4] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[4]}</div>
    </div>
    <hr>
</div>
    `;
    const atributos = document.createElement('div');
    atributos.innerHTML = html;
    atributos.className = 'atributosUsuario';
    cuerpoCard.appendChild(atributos);

}

const resumenDatosHumano = (datos) => {
    const htmlResumenHumano = `
    <div class="row">
        <div class="col-6"><h6>Destino:</h6></div>
        <div class="col-6"><h6 class="text-end">${datos.destino}</h6></div>
    </div>

    <div class="row">
        <div class="col-6"><h6>Dios protector:</h6></div>
        <div class="col-6"><h6 class="text-end text-uppercase">${datos.nombreDios}</h6></div>
    </div>

    <div class="row">
        <div class="col-6"><h6>Situación:</h6></div>
        <div class="col-6"><h6 class="text-end text-uppercase">${datos.situacion}</h6></div>
    </div>
    `;

    const resumenHumano = document.createElement('div');
    resumenHumano.innerHTML = htmlResumenHumano;
    resumenHumano.className = 'resumenHumano';
    cuerpoCard.appendChild(resumenHumano);
}

const ponerNombreDios = (datos) => {
    const html = `
    <div class="row">
        <div class="col-6">
            <h5>Nombre Dios:</h5>
        </div>
        <div class="col-6 text-end text-uppercase">
            <h5>${datos.nombreUsuario}</h5>
        </div>
            `;

    const titulo = document.createElement('div');
    titulo.innerHTML = html;
    tituloCard.appendChild(titulo);
};

const mostrarAtributosDios = (datos) => {
    const html = `
    <div class="atrib1">
    <div class="row">
        <h6 class="col-9">Sabiduria</h6>
        <div class="col-3">
            <button class="btnAtrib w-100" id="btnAtrib1">Editar</button>
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[0] * 20}%;" aria-valuenow="${datos.atributos[0] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[0]}</div>
    </div>
</div>

<div class="atrib2">
    <div class="row">
        <h6 class="col-9">Nobleza</h6>
        <div class="col-3">
            <button class="btnAtrib w-100" id="btnAtrib2">Editar</button>
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[1] * 20}%;" aria-valuenow="${datos.atributos[1] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[1]}</div>
    </div>
</div>

<div class="atrib3">
    <div class="row">
        <h6 class="col-9">Virtud</h6>
        <div class="col-3">
            <button class="btnAtrib w-100" id="btnAtrib3">Editar</button>
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[2] * 20}%;" aria-valuenow="${datos.atributos[2] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[2]}</div>
    </div>
</div>

<div class="atrib4">
    <div class="row">
        <h6 class="col-9">Maldad</h6>
        <div class="col-3">
            <button class="btnAtrib w-100" id="btnAtrib4">Editar</button>
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[3] * 20}%;" aria-valuenow="${datos.atributos[3] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[3]}</div>
    </div>
</div>

<div class="atrib5">
    <div class="row">
        <h6 class="col-9">Astucia</h6>
        <div class="col-3">
            <button class="btnAtrib w-100" id="btnAtrib5">Editar</button>
        </div>
    </div>
    <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" style="width: ${datos.atributos[4] * 20}%;" aria-valuenow="${datos.atributos[4] * 20}" aria-valuemin="0" aria-valuemax="100">${datos.atributos[4]}</div>
    </div>
    <hr>
</div>
    `;
    const atributos = document.createElement('div');
    atributos.innerHTML = html;
    atributos.className = 'atributosUsuario';
    cuerpoCard.appendChild(atributos);

}

const resumenDatosDios = (datos) => {
    const htmlResumenDios = `
    <div class="row">
        <div class="col-8"><h6>Límite establecido Campos Eliseos:</h6></div>
        <div class="col-2"><button class="btnAtrib w-80" id="btnModLimEliseo">Editar</button></div>
        <div class="col-2"><h6 class="text-end">${datos.limiteEliseo}</h6></div>
    </div>
    `;

    const resumenDios = document.createElement('div');
    resumenDios.innerHTML = htmlResumenDios;
    resumenDios.className = 'resumenDios';
    cuerpoCard.appendChild(resumenDios);
}

