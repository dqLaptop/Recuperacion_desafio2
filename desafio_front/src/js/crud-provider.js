
const api = "http://127.0.0.1:8000/api";

const hacerLogin = async (usuario) => {
    const resp = await fetch(`${api}/login`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}

const hacerLogout = async (usuario) => {
    const resp = await fetch(`${api}/logout`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}
const obtenerUsuario = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/Usuario/listarXId/${id}`, options);
        if (!resp.ok) { throw ('No se ha encontrado ningun comentario'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const crearUsuario = async (usuario) => {
    const resp = await fetch(`${api}/register`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await resp.json();
}

const traerInfo = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/Usuario/info/${id}`, options);
    return await resp.json();
}

export {
    hacerLogout,
    hacerLogin,
    crearUsuario,
    traerInfo,
    obtenerUsuario
}
