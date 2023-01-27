const api = "http://127.0.0.1:8000/api/Hermes";
const obtenerComentario = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const resp = await fetch(`${api}/obtenerComentario/${id}`, options);
    const { data } = await resp.json();
    return data;
}
const getComentariosNoLeidos = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/noleidos/${id}`, options);
        if (!resp.ok) { throw ('No se ha encontrado ningun comentario'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const getComentariosLeidos = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/leidos/${id}`, options);
        if (!resp.ok) { throw ('No se ha encontrado ningun comentario'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const getComentarios = async (id, token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`${api}/todos/${id}`, options);
        if (!resp.ok) { throw ('No se ha encontrado ningun comentario'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const eliminarComentario = async (id, token) => {
    const resp = await fetch(`${api}/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    return (resp.ok) ? 'Borrado' : 'No se pudo eliminar';
}
const getComentariosConcretos = async (datos, token) => {
    const resp = await fetch(`${api}/obtenerComentarioUsuario`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return await resp.json();
}
const obtenerUsuarios = async (token) => {
    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const resp = await fetch(`http://127.0.0.1:8000/api/Usuario/listar`, options);
        if (!resp.ok) { throw ('No se ha encontrado ningun usuario'); }
        const data = await resp.json();
        return data;
    } catch (error) {
        throw error
    };
}
const generarEnvioTodos = async (c, token) => {
    try {
        const resp = await fetch(`${api}/enviarTodos`, {
            method: 'POST',
            body: JSON.stringify(c),
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
const modificarComentario = async (token,id) => {
    console.log(JSON.stringify(id));
    const resp = await fetch(`${api}/modificarNoLeido`, {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    let d=await resp.json();
    return d;
}
const generarEnvio = async (c, token) => {
    try {
        const resp = await fetch(`${api}/enviar`, {
            method: 'POST',
            body: JSON.stringify(c),
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
    getComentarios,
    getComentariosConcretos,
    getComentariosNoLeidos,
    getComentariosLeidos,
    obtenerComentario,
    eliminarComentario,
    obtenerUsuarios,
    generarEnvio,
    generarEnvioTodos,
    modificarComentario
}