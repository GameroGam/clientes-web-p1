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


export function suscribeToPosts(callbackNewPost, callbackNewChange) {
    const postChannel = supabase.channel('posts');

    postChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            table: 'posts', 
            schema: 'public'
        },
        payload => {
            console.log("Recibimos un nuevo posteo: ", payload);
            callbackNewPost(payload.new);
        }
    );

    postChannel.on(
        'postgres_changes',
        {
            event: 'UPDATE',
            table: 'posts', 
            schema: 'public'
        },
        payload => {
            console.log("Recibimos una nueva actualización ", payload);
            callbackNewChange(payload.new);
        }
    );

    postChannel.subscribe();
}

// export async function suscribeToPostChanges(callback) {
//     const postChannel = supabase.channel('posts');

//     postChannel.on(
//         'postgres_changes',
//         {
//             event: 'UPDATE',
//             table: 'posts', 
//             schema: 'public'
//         },
//         payload => {
//             console.log("Recibimos una nueva actualización ", payload);
//             callback(payload.new);
//         }
//     );

//     postChannel.subscribe();
// }


export async function increaseLikesToPost(postId) {
    const { data, err } = await supabase.from('posts').select('like').eq('id', postId);


    
    let newLikes = data[0].like + 1;
    
 
    const { data2, error } = await supabase.from('posts').update({ like: newLikes}).eq('id', postId);

    if(error) {
        console.log('[services/posts.js -> increaseLikesToPost] Hubo un error al intentar obtener los posteos', error);
        throw new Error(error.message);
    }
}

export async function updatedLikes() {
    const { data, error } = await supabase.from('posts').select('like');

    console.log(data);
}

export async function getMostUsedWords() {
    const {data, error } = await supabase.from('posts').select('content');

    if(error) {
        console.log('[services/posts.js -> getMostUsedWords] Hubo un error al intentar obtener las palabras más usadas', error);
        throw new Error(error.message);
    }

    let bannedWords = ['hola', 'como estan', 'chau', 'bien', 'mal', "a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "en", "entre", "hacia", "hasta", "mediante", "para", "por", "según", "sin", "so", "sobre", "tras", "versus", "vía"];

    let words = [];
    for(const post of data) {
        
        let contentArr = post.content.split(' ');
     
        contentArr = contentArr.map(word => word.toLowerCase());


        contentArr.forEach(word => {
            if(!bannedWords.includes(word)) {
                words.push(word);
            }
        });
    }
    
    let repitences  = []


    for (const word of words) {
        const existing = repitences.find(repitence => repitence.word === word);
        if(!existing) {
            repitences.push({word: word, q: 1});
        } else {
            existing.q++;
        }
    }

   
    repitences.sort((a, b) => b.q - a.q);
    
    let wordTendencies = [];
    wordTendencies.push(repitences[0], repitences[1], repitences[2]);

    return wordTendencies;
}

export async function getPostTrendencies(wordTendencies) {
    console.log(wordTendencies);
    const { data, error } = await supabase.from('posts').select().or(`content.ilike.%${wordTendencies[0].word}%, content.ilike.%${wordTendencies[1].word}%, content.ilike.%${wordTendencies[2].word}%`);

    if(error) {
        console.log('[services/posts.js -> getPostTrendencies] Hubo un error al intentar obtener las posteos tendencias', error);
        throw new Error(error.message);
    }

    return data;

}