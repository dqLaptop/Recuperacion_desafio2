const api = "http://127.0.0.1:8000/api";

const obtenerPrueba = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/Prueba/obtener/${id}`, options);
    const { data } = await resp.json();
    return data;
}
const getPrueba = async (token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/Prueba/obtener`, options);
        if (!resp.ok) { throw ('No se ha encontrado ninguna prueba'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}

const crearPrueba = async (prueba, token) => {
    try {
        const resp = await fetch(`${api}/Prueba/crear`, {
            method: 'POST',
            body: JSON.stringify(prueba),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await resp.json();
        return data;
    } catch (error) {
        throw error;
    }
}
const modificarPrueba = async (id, prueba, token) => {
    const resp = await fetch(`${api}/Prueba/modificar/${id}`, {
        method: 'PUT',
        body: JSON.stringify(prueba),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return await resp.json();
}
const asignarTodos = async (id, token) => {
    try {
        const resp = await fetch(`${api}/Asignacion/asignarPruebaTodos`, {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await resp.json();
        return data;
    } catch (error) {
        throw error;
    }

}
const asignarPrueba = async (asignacion, token) => {
    try {
        const resp = await fetch(`${api}/Asignacion/asignarPrueba`, {
            method: 'POST',
            body: JSON.stringify(asignacion),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await resp.json();
        return data;
    } catch (error) {
        throw error;
    }

}
const eliminarPrueba = async (id, token) => {
    const resp = await fetch(`${api}/Prueba/borrar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });

    return (resp.ok) ? 'Borrado' : 'No se pudo eliminar';

}
const getPruebaRl = async (idP, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/Rl/obtener/${idP}`, options);
    const { data } = await resp.json();
    return data;
}
const getPruebaValoracion = async (idP, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/Valoracion/obtener/${idP}`, options);
    const { data } = await resp.json();
    return data;
}
const getPruebaEleccion = async (idP, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/Eleccion/obtener/${idP}`, options);
    const { data } = await resp.json();
    return data;
}
const getPruebaPuntual = async (idP, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/Puntual/obtener/${idP}`, options);
    const { data } = await resp.json();
    return data;
}
const getPruebaRespuesta = async (id, token) => {
    try {
        const resp = await fetch(`${api}/Asignacion/getInfoPrueba`, {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await resp.json();
        return data;
    } catch (error) {
        throw error;
    }
}
const getPruebaRespEleccion = async (id, token) => {
    try {
        const resp = await fetch(`${api}/Eleccion/obtenerNombre`, {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await resp.json();
        return data;
    } catch (error) {
        throw error;
    }
}
const resolverEleccion = async (id, token) => {
    try {
        const resp = await fetch(`${api}/Eleccion/resolver`, {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        let data = await resp.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export {
    crearPrueba,
    getPrueba,
    obtenerPrueba,
    eliminarPrueba,
    modificarPrueba,
    getPruebaEleccion,
    getPruebaRl,
    getPruebaPuntual,
    getPruebaValoracion,
    asignarTodos,
    asignarPrueba,
    getPruebaRespuesta,
    getPruebaRespEleccion,
    resolverEleccion
}