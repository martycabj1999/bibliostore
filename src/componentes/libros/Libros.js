import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Libros = ({libros, firestore}) => {

    const eliminarLibro = id => {
        //eliminar libro de firestore
        firestore.delete({
            collection : 'libros',
            doc : id
        });
    }

    if (!libros) return <Spinner />


    return ( 
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/libros/nuevo" className="btn btn-success">
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i> {''}
                    Libros
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link 
                                    to={`/libros/mostrar/${libro.id}`}
                                    className="btn btn-success btn-block"
                                >
                                    <i className="fas fa-angle-double-right"></i> {''}
                                    Más Información
                                </Link>
                                <button type="button" className="btn btn-danger btn-block" onClick={ () => eliminarLibro(libro.id)}>
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}

Libros.propTypes = {
    firestore : PropTypes.object.isRequired,
    libros : PropTypes.array
}
 
export default compose(
    firestoreConnect([{collection : 'libros' }]),
    connect((state, props) => ({
        libros: state.firestore.ordered.libros
    }))
)(Libros);