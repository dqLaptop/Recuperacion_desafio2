import { crearUsuario } from './crud-provider';
import { User } from '../Classes/User.class';

const nombre = document.querySelector('#nombre');
const emailR = document.querySelector('#email');
const cerrar = document.querySelectorAll('.cerrar');
const formulario = document.querySelector('#formulario');
const spanError = document.querySelectorAll('.invalid-feedback');
const password = document.querySelector('#password')
const respuestaR = document.querySelector('.respuesta');
const mensaje = document.querySelector('.mensaje')


cerrar.forEach(c => c.addEventListener('click', function () {
    nombre.value = "";
    emailR.value = "";
    password.value = "";
    respuestaR.classList.remove('aparecer');
    respuestaR.classList.add('desaparecer');
    mensaje.innerHTML = "";

}));
emailR.addEventListener('input', () => {
    if (emailR.validity.valid) {
        spanError[1].innerHTML = '';
        spanError[1].className = 'error';
    } else {
        showErrorEmail();
    }
});
nombre.addEventListener('input', () => {
    if (nombre.validity.valid) {
        spanError[0].innerHTML = '';
        spanError[0].className = 'error';
    } else {
        showErrorNombre();
    }
});
password.addEventListener('input', () => {
    if (password.validity.valid) {
        spanError[2].innerHTML = '';
        spanError[2].className = 'errorPass';
    } else {
        showErrorPassword();
    }
});

formulario.addEventListener('submit', async (e) => {
    if (!emailR.validity.valid) {
        showError();
        e.preventDefault();
    } else {
        const data = new FormData(document.getElementById('formulario'));
        let usuario = new User(data.get('nombre'), data.get('email'), data.get('password'), 1);
        crearUsuario(usuario).then((res) => {
            respuestaR.classList.remove('desaparecer');
            respuestaR.classList.add('aparecer');
            if (res.success) {
                mensaje.innerHTML = "¡¡Felicidades!! Te has registrado correctamente en breve recibiras un correo de verificación"
            } else {
                mensaje.innerHTML = "Lo sentimos, pero no se te ha podido registrar, por favor vuelva a registrarse";
            }
            nombre.value = "";
            emailR.value = "";
            password.value = "";
        }).catch((err => {
            console.log(err);
            e.preventDefault();
        }));
        e.preventDefault();
    }
});
const showErrorEmail = () => {
    if (emailR.validity.valueMissing) {
        spanError[1].textContent = 'Debe introducir una dirección de correo electrónico.';
    } else if (emailR.validity.typeMismatch) {
        spanError[1].textContent = 'El valor introducido debe ser una dirección de correo electrónico.'
    }
    spanError[1].className = 'error';
}
const showErrorPassword = () => {
    if (password.validity.tooShort) {
        spanError[2].textContent = `La contraseña debe tener al menos 6 caracteres.`
    }
    spanError[2].className = 'error';
}
const showErrorNombre = () => {
    if (nombre.validity.tooShort) {
        spanError[0].textContent = `El nombre debe estar compuesto minimo de tres letras.`
    } else if (nombre.validity.valueMissing) {
        spanError[0].textContent = `El nombre es un campo obligatorio`
    }
    spanError[0].className = 'errorPass';
}

const showError = () => {
    if (emailR.validity.valueMissing) {
        document.querySelectorAll("span.invalid-feedback")[1].innerHTML = 'Debe introducir una dirección de correo electrónico.';
    } else if (emailR.validity.typeMismatch) {
        emailError.textContent = 'El valor introducido debe ser una dirección de correo electrónico.'
    } else if (emailR.validity.tooShort) {
        emailError.textContent = `El correo electrónico debe tener al menos ${emailR.minLenght} caracteres.`
    }
    emailError.className = 'error';
}




