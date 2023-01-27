import {guardarLocalStorage} from './localStorage';
import { hacerLogin } from './crud-provider';

const btnLogin = document.querySelector('.btnLogin');
const btnLoginDeModal = document.getElementById('btnSubmit');
const emailInput = document.getElementById('emailLogin');
const passInput = document.getElementById('passwordLogin')
const mensajeFracaso = document.querySelector('.mensajeFracaso');
const emailError = document.querySelector('span.error');
const passError = document.querySelector('span.errorPass');
const btnContinuarLogin = document.querySelector('.btnContinuarLogin');


btnLogin.addEventListener('click', () => {
    limpiarFormulario();
});

emailInput.addEventListener('input', () => {
    if(emailInput.validity.valid) {
        emailError.innerHTML='';
        emailError.className='error';
    } else { 
        showError();
    }
});

passInput.addEventListener('input', () => {
    if(passInput.validity.valid) {
        passError.innerHTML='';
        passError.className='errorPass';
    } else {
        showErrorPass();
    }
});

btnLoginDeModal.addEventListener('click', () => {
    limpiarMensaje();
    let email = emailInput.value;
    if (!emailInput.validity.valid) {
        showError();
    } else {
        let pass = passInput.value;
        if (!passInput.validity.valid) {
            showErrorPass();
        } else {
            let usuario = { email: email, password: pass };
            hacerLogin(usuario).then((respuesta) => {
                if (respuesta.success) {
                    respuesta.data['pass'] = pass;
                    guardarLocalStorage('HumanoToken', respuesta.data);
                    window.open('html/IndexPersonaje.html','_self');
                } else {
                    mensajeFracaso.classList.remove('desaparecer');
                    mensajeFracaso.classList.add('aparecer');
                }
            });
        }
    }
});

const showError = () => {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = 'Debe introducir una dirección de correo electrónico.';
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = 'El valor introducido debe ser una dirección de correo electrónico.'
    }
    emailError.className = 'error';
}

const showErrorPass = () => {
    if (passInput.validity.tooShort) {
        passError.textContent = `La contraseña debe tener al menos 6 caracteres.`
    }
    passError.className = 'errorPass';
}

const limpiarMensaje = () => {
    mensajeFracaso.classList.remove('aparecer');
    mensajeFracaso.classList.add('desaparecer');
}

const limpiarFormulario = () => {
    limpiarMensaje();
    emailInput.value='';
    passInput.value='';
}

btnContinuarLogin.addEventListener('click', () => { 
    limpiarFormulario();
});

