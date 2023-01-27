const api = "http://127.0.0.1:8000/api/Usuario";


const getUsuarios = async (token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/obtenerInfo`, options);
        if (!resp.ok) { throw ('No se ha encontrado ningun usuario'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const addUsuariosMasivos = async (num, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/crearHumanosMasivo/${num}`, options);
        if (!resp.ok) { throw ('No se han podido añadir los humanos pedidos'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const obtenerVivos = async (token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/obtenerInfoVivos`, options);
        if (!resp.ok) { throw ('No se han encontrado humanos'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const obtenerTartaro = async (token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/obtenerInfoTartaro`, options);
        if (!resp.ok) { throw ('No se han encontrado humanos'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const obtenerAtributos = async (id, token) => {

    try {
        const resp = await fetch(`http://127.0.0.1:8000/api/Atributos/obtenerInfoAtributos`, {
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

const modificarAtributos = async (id, token) => {
    const resp = await fetch(`http://127.0.0.1:8000/api/Atributos/modificar`, {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return await resp.json();
}

export {
    getUsuarios,
    addUsuariosMasivos,
    obtenerVivos,
    obtenerTartaro,
    modificarAtributos,
    obtenerAtributos
}