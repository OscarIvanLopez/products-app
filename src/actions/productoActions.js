import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGAR_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'
import EditarProducto from '../components/EditarProducto';

//! Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // insertar en la api
            await clienteAxios.post('/productos', producto);

            //si todo sale bien actualizar el state
            dispatch(agregarProductoExito(producto));

            //Alerta 
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {

            //si hay un error
            dispatch(agregarProductoError());

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

// //! Funciones de crearNuevoProductoAction()
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = () => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: true
})
//! //////////////////////////

//! Funcion que descarga los prodcutos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            dispatch(descargarProductosError());
        }
    }
}

// //! Funciones de obtenerProductosAction()
const descargarProductos = () => ({
    type: COMENZAR_DESCARGAR_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGAR_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGAR_PRODUCTOS_ERROR,
    payload: true
})
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//! Selecciona y Elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar());

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            //! Si se elimina, mostrar alerta
            Swal.fire(
                'Aliminado!',
                'El producto se elimino correctamente.',
                'success'
            )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }

}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//! Colocar producto en edicion 
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto));
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//!Edita un tegistro en la api y el state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
            console.log(resultado);
        } catch (error) {

        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: producto

})