import {supabase} from './supabase';


// export default function getSomeUsersFromUsers() {
//     const {data, error} = await supabase.from('user')
// }

export async function getUserById(id) {
    const {data, error} = await supabase
    .from('user_profile').select('*').eq('id', id).limit(1);
    if (error) {
        console.error('Error al traer perfil de usuario por id', error);
        throw new Error(error.message);
    }
    if(data.length > 0) {
        return data;
    } else {
        return null;
    }
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

export async function getSomeUsers() {
  const { data, error } = await supabase
    .from('user_profile')
    .select(`
        id,
        name
    `)
    .not('name', 'is', null)
    .limit(3);


  if (error) {
    console.error('Error al obtener algunos usuarios', error);
    throw new Error(error.message);
  }

  return data;
}