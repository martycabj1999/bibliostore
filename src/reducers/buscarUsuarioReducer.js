import { BUSCAR_USUARIO } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case BUSCAR_USUARIO:
            return{
                ...state,
                nombre: action.usuario.nombre,
                apellido: action.usuario.apellido,
                codigo: action.usuario.codigo,
                carrea: action.usuario.carrera
            }
        default:
            return state;
    }
}

