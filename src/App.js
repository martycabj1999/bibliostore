import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

//import
import Libros from './componentes/libros/Libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';

import Suscriptores from './componentes/suscriptores/Suscriptores';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';

import Login from './componentes/auth/Login';
import Navbar from './componentes/layout/Navbar';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Libros} />
            <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)} />
            <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)} />
            <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)} />
            <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(PrestamoLibro)} />



            <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)} />
            <Route exact path="/suscriptor/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)} />
            <Route exact path="/suscriptor/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)} />
            <Route exact path="/suscriptor/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)} />
            
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
