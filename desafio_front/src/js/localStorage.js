
const limpiarLocalStorage = (clave) => {
    localStorage.removeItem(clave);
};

const guardarLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
};

const cargarLocalStorage = (clave) => {
    let tokenLS = (localStorage.getItem(clave)) ? JSON.parse(localStorage.getItem(clave)) : [];
    return tokenLS;
};

export {
    limpiarLocalStorage,
    guardarLocalStorage,
    cargarLocalStorage
}