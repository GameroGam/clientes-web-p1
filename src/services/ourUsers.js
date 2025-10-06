import {supabase} from './supabase';


// export default function getSomeUsersFromUsers() {
//     const {data, error} = await supabase.from('user')
// }

export async function getUserById(id) {
    const {data, error} = await supabase
    .from('user_profile').select('*').eq('id', id).single();
    if (error) {
        console.error('Error al traer perfil de usuario por id', error);
        throw new Error(error.message);
    }
    return data;
}

export async function createUserProfile(data) {
    const { error } = await supabase
        .from('user_profile')
        .insert(data);
    if (error) {
        console.error('Error al crear perfil de usuario', error);
        throw new Error(error.message);
    }
}

export async function updateUserProfile(id, data) {
    const { error } = await supabase
        .from('user_profile')
        .update(data)
        .eq('id', id);
    if (error) {
        console.error('Error al actualizar perfil de usuario', error);
        throw new Error(error.message);
    }
}