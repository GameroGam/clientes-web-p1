<script>
import { getUserById } from '../services/ourUsers';
import { suscribeToAuthStateChanges } from '../services/auth';


export default {
    name: 'UserInfo',
    data() {
        return {
            user: null,
            unsubscribe: null,
        }
    },
    props: {
        user_id: String,
        isOwnProfile: Boolean,
    },
    emits: ['user-loaded'],
    async mounted() {
    await this.loadUserInfo();
    },

    watch: {
        async user_id() {
        await this.loadUserInfo();
      },
    },

  methods: {
    async loadUserInfo() {
      this.user = null;

      if(this.unsubscribe) {
        this.unsubscribe();
      }

      if (this.user_id) {
        try {
          const userProfile = await getUserById(this.user_id);
          console.log(userProfile, 'user');
          this.user = userProfile;
          this.$emit('user-loaded', userProfile);
        } catch (error) {
          console.error('Error al obtener el perfil del usuario', error);
        }
      } else {
        this.unsubscribe = suscribeToAuthStateChanges((userState) => {
            this.user = userState;
            this.$emit('user-loaded', userState);
        });
      }
    },
  },

unmounted() {
    if (this.unsubscribe) {
        this.unsubscribe();
        console.log('[DEBUG] Observer eliminado desde UserInfo');
    }
}
}
</script>

<template>
    <section v-if="user" class="p-4 border-b border-gray-300 flex items-center justify-between h-50" id="userInfo">
    <div>
      <h2 class="text-xl font-bold mb-2">
        {{ user[0].name || user.email }}
        <span v-if="isOwnProfile" class="text-sm text-gray-500">(vos)</span>
      </h2>
      <p class="text-gray-300 mb-1" v-if="isOwnProfile">{{ user[0].bio || 'Aún no tenés una biografía' }}</p>
      <p class="text-gray-300 mb-1" v-else>{{ user[0].bio || 'Aún no tiene una biografía' }}</p>
      <p class="text-gray-400 text-sm">
        Unido desde: {{ new Date(user[0].created_at).toLocaleDateString() }}
      </p>
    </div>
    <button v-if="isOwnProfile" @click="$router.push('/editar-perfil')" class=" bg-blue-900 py-2 px-4 rounded-xl hover:cursor-pointer hover:opacity-95 ">
    Editar mi perfil
    </button>
  </section>

  <section v-else class="p-4 text-gray-500">
    Problema al cargar el perfil del usuario.
  </section>

</template>
