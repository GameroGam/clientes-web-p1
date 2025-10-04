import { supabase } from "./supabase";


export async function register({ email, name, password}) {
    
    const { data, error } = await supabase.auth.signUp({
        email,
        name,
        password
    });

    if(error) {
        console.log('[services/auth.js -> register] Hubo un error al intentar registrar al usuario', error);
        throw new Error(error.message);
    };

        console.log('usuario registrado', data);
}