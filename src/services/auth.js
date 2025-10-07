import { supabase } from "./supabase";
import { getUserById } from "./ourUsers";
import { createUserProfile } from "./ourUsers";

let user = {
  id: null,
  email: null,
  name: null,
  bio: null,
};

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

    
    loadUserFullProfile(); //no hace falta el await
}

async function loadUserFullProfile() {
        setUser(await getUserById(user.id));
}

export async function register({ email, password}) {
    try{
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if(error) {
            console.log('[services/auth.js -> register] Hubo un error al intentar registrar al usuario', error);
            throw new Error(error.message);
        };

        console.log('usuario registrado', data);

        setUser({
            id: data.user.id,
            email: data.user.email,
        });

        await createUserProfile({
            id: data.user.id,
            email: data.user.email,
        });
    } catch (error) {
        console.error('Error en el registro', error);
        throw new Error(error.message);
    }
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


/**
 * 
 * @param {(userState: {id: String|null, email: String|null}) => void} callback 
 */
export function suscribeToAuthStateChanges(callback) {
    observers.push(callback);
    console.log('[>>ATENCIÓN_DEBUG<<] nuevo observer registrado', observers.length);

    notify(callback);

    return () => {
        observers = observers.filter(obs => callback !== obs);
        console.log('[>>ATENCIÓN_DEBUG<<] observer eliminado', observers.length);
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

export function setUser(data) {
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