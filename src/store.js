import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//Custom Reducers
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

//configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyBxfTE-aNyYZKEWnYcExuKhJeQKbiNaTyY",
    authDomain: "bibliostore-10b82.firebaseapp.com",
    databaseURL: "https://bibliostore-10b82.firebaseio.com",
    projectId: "bibliostore-10b82",
    storageBucket: "bibliostore-10b82.appspot.com",
    messagingSenderId: "153278512373",
    appId: "1:153278512373:web:395c8b6e8fc4ff24"
}


//inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

//crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose (
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//reducer
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer,
    usuario: buscarUsuarioReducer
})

//state inicial
const initialState = {};

//create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;