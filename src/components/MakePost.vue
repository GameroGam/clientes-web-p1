<script>
import { suscribeToAuthStateChanges } from '../services/auth';
import { createNewPost } from '../services/posts';

    export default {
        name: 'MakePost',
        data() {
           return {
                user: {
                    id: null,
                    email: null,
                    name: null,
                },
                newPost: {
                    email: '',
                    name: '',
                    content: '¿Que querés postear hoy?',
                    like: 0,
                    user_id: null,
                } ,
                showModal: false,
           }
        },
        methods: {
            handleTextareaClick(){
                if(!this.user.name){
                    this.showModal = true;
                }
            },
            async handleSubmit() {
                if(!this.user.name) {
                    this.showModal = true;
                    return;
                }
                this.newPost.content = this.newPost.content.trim();
                try {
                    await createNewPost({
                        email: this.user.email,
                        name: this.user.name,
                        content: this.newPost.content,
                        like: this.newPost.like,
                        user_id: this.user.id,
                    });
                    this.newPost.content = '';
                } catch (err) {
                    console.log('Hubo un error al intentar crear un nuevo posteo', err);
                }
            },
            closeModal() {
                this.showModal = false;
            },
            goToProfile() {
                this.$router.push('/perfil');
            }
        },
        mounted() {
            suscribeToAuthStateChanges(userState => this.user = userState);
        }
    }
</script>

<template>
    <section class=" w-3xl mt-6 flex flex-col items-center">
        <h2 class="text-lg">{{ user.name || user.email }}</h2>
        <form action="#" @submit.prevent="handleSubmit()">
            <div>
                <label for="content"></label>
                <textarea name="content" id="content" v-model="newPost.content" class=" w-100 border-b-1 border-b-gray-400 p-2" @click="handleTextareaClick"></textarea>
                
            </div>
            <div>
                <input type="submit" value="Postear" class=" bg-blue-900 py-2 px-4 rounded-xl hover:cursor-pointer hover:opacity-95 mt-3">
            </div>
        </form>
        <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
        <h3 class="text-lg font-semibold mb-3 text-gray-800">
          No podés crear un post todavía
        </h3>
        <p class="text-gray-600 mb-5">
          Para poder postear, primero completá tu perfil de usuario.
        </p>
        <div class="flex justify-center gap-3">
          <button
            @click="goToProfile"
            class="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Ir al perfil
          </button>
          <button
            @click="closeModal"
            class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
    </section>
</template>

<style scoped>

</style>