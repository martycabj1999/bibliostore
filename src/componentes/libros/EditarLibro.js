import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditarLibro extends Component {
    
    //refs
    tituloInput = React.createRef();
    editorialInput = React.createRef();
    ISBNInput = React.createRef();
    existenciaInput = React.createRef();

    //actualiza el libro en firebase
    actualizarLibro = e => {
        e.preventDefault();

        //construir el nuevo objeto
        const libroActualizado = {
            titulo : this.tituloInput.current.value,
            editorial : this.editorialInput.current.value,
            ISBN : this.ISBNInput.current.value,
            existencia : this.existenciaInput.current.value
        }

        //leer firestore y history
        const { firestore, history, libro } = this.props;

        //actualizar en firestore
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libroActualizado).then(history.push('/'))

    }

    render() { 

        //obtener el linro
        const { libro } = this.props;

        if(!libro) return <Spinner />

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
                        Editar Libro
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.actualizarLibro}>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre del Libro"
                                        required
                                        defaultValue={libro.titulo}
                                        ref={this.tituloInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del Libro"
                                        required
                                        defaultValue={libro.editorial}
                                        ref={this.editorialInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN del Libro"
                                        required
                                        defaultValue={libro.ISBN}
                                        ref={this.ISBNInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad de Existencia"
                                        required
                                        defaultValue={libro.existencia}
                                        ref={this.existenciaInput}
                                    />
                                </div>

                                <input type="submit" value="Editar Libro" className="btn btn-success"/>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
EditarLibro.propTypes = {
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
    connect(({ firestore: {ordered}}, props ) => ({
        libro : ordered.libro && ordered.libro[0]
    }))
)(EditarLibro);