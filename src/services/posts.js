import {supabase} from './supabase';

export async function createNewPost({ email, name, content, like = 0}) {
    const { data, error } = await supabase.from('posts').insert({
        email: email,
        name: name,
        content: content,
        like: like
    });

    if(error) {
        console.log('[services/posts.js -> createNewPost] Hubo un error al intentar crear el posteo', error);
        throw new Error(error.message);
    }

    console.log('Creando nuevo posteo!', data);
}


export async function getAllPosts() {
    // Order nos permite ordenar los resultados por
    const { data, error } = await supabase.from('posts').select().order('id', {ascending: true});

    if(error) {
        console.log('[services/posts.js -> getAllPosts] Hubo un error al intentar obtener los posteos', error);
        throw new Error(error.message);
    }

    return data;
} 

export async function getPostsByUser(email) {
    const { data, error } = await supabase.from('posts').select().eq('email', email).order('id', {ascending: true});
    
    if(error) {
        console.log('[services/posts.js -> getPostsByUser] Hubo un error al intentar obtener los posteos', error);
        throw new Error(error.message);
    }
}

export function suscribeToPosts(callback) {
    const chatChannel = supabase.channel('posts');

    chatChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            table: 'posts', 
            schema: 'public'
        },
        payload => {
            console.log("Recibimos un nuevo posteo: ", payload);
            callback(payload.new);
        }
    );

    chatChannel.subscribe();
}


export async function increaseLikesToPost(postId) {
    const { data, err } = await supabase.from('posts').select('like').eq('id', postId);

    console.log(data)
    
    let newLikes = data[0].like + 1;
    
 
    const { data2, error } = await supabase.from('posts').update({ like: newLikes}).eq('id', postId);

    if(error) {
        console.log('[services/posts.js -> increaseLikesToPost] Hubo un error al intentar obtener los posteos', error);
        throw new Error(error.message);
    }
}