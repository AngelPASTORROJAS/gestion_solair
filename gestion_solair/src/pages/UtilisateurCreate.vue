<template>
    <q-page class="q-pa-lg">
        <p class="sub-title">Utilisateur / Création</p>
        <q-form @submit="onSubmit">
            <div class="row bg-pink-4">
                <q-list class="col-12" bordered padding>
                    <q-expansion-item default-opened expand-separator label="Informations de l'utilisateur">
                        <q-item>
                            <div class="col-12">
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Identifiant"
                                    v-model="utilisateur.login"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Nom"
                                    v-model="utilisateur.nom"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Prénom"
                                    v-model="utilisateur.prenom"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"    
                                    label="Mail"
                                    v-model="utilisateur.mail"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Mot de passe"
                                    v-model="utilisateur.password"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"    
                                    label="Rôle"
                                    v-model="utilisateur.role"
                                ></InputCustom>
                            </div>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
            <ul class="selections row justify-evenly">
                <li>
                    <q-btn class="bouton-default2" :to="{ name: 'utilisateurs' }">Précedent</q-btn>
                </li>
                <li>
                    <q-btn class="bouton-default" type="submit" @click="isCheck()">Créer</q-btn>
                </li>
            </ul>
        </q-form>
    </q-page>
</template>

<script lang="ts">
import InputCustom from 'src/components/InputCustom.vue';
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { UtilisateurExtend } from 'src/api/utilisateur/utilisateur';

export default defineComponent ({
    name: 'Utilisateur-create',
    setup() {
        const $q = useQuasar();
        const utilisateur = ref({} as UtilisateurExtend);

        const isCheck = () => {
            if(!utilisateur.value.login || !utilisateur.value.nom || !utilisateur.value.prenom || !utilisateur.value.mail || !utilisateur.value.password || !utilisateur.value.role) {
                $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'error_outline',
                    message: 'Vueillez compléter les champs obligatoires',
                    position: 'top'
                })
            }
        }

        const onSubmit = async () => {
            var accepted = true // await gestionSolaire.utilisateur.createAsync(utilisateur.value);
            if (accepted == true) {
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Sauvegarder',
                    position: 'top'
                });
            } else {
                $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: 'Erreur de sauvegarde',
                    position: 'top'
                })
            }
        }

        return {
            utilisateur,
            isCheck,
            onSubmit
        };
    },

    components: {
        InputCustom,
    }
})
</script>

<style lang="scss">
.selections {
  list-style: none;
  gap: 15px;
}
</style>
