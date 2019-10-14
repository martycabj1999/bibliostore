import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

//REDUX Actions
import { buscarUsuario } from '../../actions/buscarUsuarioActions';
class PrestamoLibro extends Component {
    state = { 
        noResultados: false,
        busqueda : ''
     }
    //buscar alumno por codigo
    buscarAlumno = e => {
        e.preventDefault();

        //obtener el valor a buscar
        const { busqueda } = this.state;

        //extraer firestore
        const { firestore, buscarUsuario } = this.props;

        //hacer la consulta
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo", "==", busqueda).get();

        //leer los resultados
        consulta.then(resultado => {
            if (resultado.empty){
                //no hay resultados

                //almacenar en redux un objeto vacio
                buscarUsuario({})
                this.setState({
                    noResultados: true
                })
            } else {
                //si hay resultados
                const datos = resultado.docs[0];
                //colocar el resultado en el state de redux

                buscarUsuario(datos.data())
                //actualizar el state en base a si hay resultados
                this.setState({
                    noResultados: false
                })
            }
        })

    }

    //almacena los datos del alumno para solicitar el libro
    solicitarPrestamo = () => {
        const { usuario } = this.props;

        //fecha de alta
        usuario.fecha_solicitud = new Date().toLocaleDateString();

        //no se pueden mutar los props, tomar una copia y crear un arreglo nuevo
        let prestados = [];
        prestados = [...this.props.libro.prestados, usuario];

        //copiar el objeto y agregar los prestados
        const libro = {...this.props.libro};

        //eliminar los prestados anteriores
        delete libro.prestados;

        //asignar los prestados
        libro.prestados = prestados;
        
        //extraer firestore
        const  { firestore, history } = this.props;

        //almacenar en la BD
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libro).then(history.push('/'));
    
    }

    //almacenar el codigo en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 

        //extraer el libro
        const { libro } = this.props;
        
        //mostrar el spinner
        if (!libro) return <Spinner />

        //extraer los datos del alumno
        const { usuario } = this.props;

        let fichaAlumno,btnSolicitar;
        if (usuario.nombre) {
            fichaAlumno = <FichaSuscriptor 
                                alumno={usuario}
                            />
            btnSolicitar = <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={this.solicitarPrestamo}
                                >Solicitar Prestamo</button>
        } else {
            fichaAlumno=null;
            btnSolicitar=null;
        }

        //mostrar mensaje de error
        const { noResultados } = this.state;
        let mensajeResultado = '';
        if (noResultados) {
            console.log('entra');
            mensajeResultado = <div className="alert alert-danger text-center font-weight-bold">No hay resultados para ese código.</div>
        } else {
            console.log('entra else');
            mensajeResultado = null;
        }

        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''}
                        Solicitar Prestamo : {libro.titulo}
                    </h2>

                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form onSubmit={this.buscarAlumno} className="mb-4">
                                <legend className="color-primary text-center">
                                    Busca el Suscriptor por Código
                                </legend>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="busqueda" 
                                        className="form-control" 
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block"/>
                            </form>

                            {/* Muestra la ficha del alumno y el botno para solicitar el prestamo */}
                            {fichaAlumno}
                            {btnSolicitar}

                            {/* Muestra un mensaje de NO RESULTADOS */}

                            {mensajeResultado}
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection : 'libros',
            storeAs : 'libro',
            doc : props.match.params.id
        }
    ]),
    connect(({ firestore: {ordered}, usuario}, props ) => ({
        libro : ordered.libro && ordered.libro[0],
        usuario : usuario
    }), { buscarUsuario })
)(PrestamoLibro);