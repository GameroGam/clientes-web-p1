import { supabase } from "./supabase";

let user = {
  id: null,
  email: null
};

let observers = [];

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

    user = { 
        id: data.user.id,
        email: data.user.email, 
        };
    notify();
}

export async function login({ email, password }) {
    console.log('[auth.js login] datos recibidos:', email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if(error) {
        console.log('[auth.js login] Hubo un error al intentar iniciar sesión', error);
        throw new Error(error.message);
    }
    console.log('usuario logueado epetacular', data);

    user = { 
        id: data.user.id,
        email: data.user.email, 
    };
    notify();
}

export async function logout() {
    supabase.auth.signOut();
    user = { 
        id: null,
        email: null
    };
    notify();
}


export async function subAuthState(callback) {
    observers.push(callback);
    notify
    
}

function notifyAll(callback) {
    callback({...user});
}

function notify() {
    observers.forEach(callback => {
        callback({...user});
    });
}