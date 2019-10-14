import React from 'react';

const FichaSuscriptor = ({alumno}) => {
    return ( 
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">Datos del Solicitante</h3>
            <div className="card-body">
                <p className="font-weight-bold">Nombre: {''}
                    <span className="ofnt-weight-normal">{alumno.nombre}</span>
                </p>
                <p className="font-weight-bold">Código: {''}
                    <span className="ofnt-weight-normal">{alumno.codigo}</span>
                </p>
                <p className="font-weight-bold">Carrera: {''}
                    <span className="ofnt-weight-normal">{alumno.carrera}</span>
                </p>
            </div>
        </div>
     );
}
 
export default FichaSuscriptor;
