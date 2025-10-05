import { supabase } from "./supabase";


let user = {
    id: null,
    email: null
}

let observers = [];

if(localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
}

loadCurrentUserAuthState();

async function loadCurrentUserAuthState() {
    const { data, error } = await supabase.auth.getUser();

    if(error) {
        console.warn('No hay un usuario autenticado.');
        return;
    }

    setUser({
        id: data.user.id,
        email: data.user.email,
    });

    // // Cargamos el perfil extendido del usuario.
    // loadUserFullProfile();
}

export async function register({ email, password}) {

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if(error) {
        console.log('[services/auth.js -> register] Hubo un error al intentar registrar al usuario', error);
        throw new Error(error.message);
    };

    console.log('usuario registrado', data);
}

export async function login({ email,password}) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if(error) {
        console.log('[services/auth.js -> login] Hubo un error al intentar iniciar sesión', error);
        throw new Error(error.message);
    };

    setUser({
        id: data.user.id,
        email: data.user.email,
    });

    console.log('sesión iniciada', data);
}

export async function logout () {
    supabase.auth.signOut();

    setUser({
        id: null,
        email: null,
    });


}

/*--------------------------------------------------------------------------
|   Implementación de nuestro observer
+ --------------------------------------------------------------------------*/
/**
 * 
 * @param {(userState: {id: String|null, email: String|null}) => void} callback 
 */
export async function suscribeToAuthStateChanges(callback) {
    observers.push(callback);

    notify(callback);

    return () => {
        observers = observers.filter(obs => callback !== obs); // Desuscribimos
    }
}


/**
 * 
 * @param {(userState: {id: String|null, email: String|null}) => void} callback 
 */
function notify(callback) {
    callback({...user}); 
}

/**
 * Notifica a todos los observers registrados.
 */
function notifyAll() {
    // observers.forEach(callback => notify(callback));
    observers.forEach(notify);
}

function setUser(data) {
    user = {
        ...user,
        ...data,
    }

    if(user.id) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }

    notifyAll();
}