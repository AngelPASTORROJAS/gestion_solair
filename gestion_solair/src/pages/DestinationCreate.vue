<template>
    <q-page class="q-pa-lg">
        <p class="sub-title">Destination / Création</p>
        <q-form @submit="onSubmit">
            <div class="row bg-pink-4">
                <q-list class="col-12" bordered padding>
                    <q-expansion-item default-opened expand-separator label="Informations de la destination">
                        <q-item>
                            <div class="col-12">
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Nom"
                                    v-model="destination.nom"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Url de l'mage"
                                    v-model="destination.url"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Description"
                                    v-model="destination.description"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"    
                                    label="Titre"
                                    v-model="destination.titre"
                                ></InputCustom>
                                <InputCustom mention="Obligatoire" 
                                    :rules="[(val) => !!val]"    
                                    label="Article"
                                    v-model="destination.article"
                                ></InputCustom>
                            </div>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
            <ul class="selections row justify-evenly">
                <li>
                    <q-btn class="bouton-default2" :to="{ name: 'destinations' }">Précedent</q-btn>
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
import { Destination } from 'src/api/destination/destination';

export default defineComponent ({
    name: 'Destinations-create',
    setup() {
        const $q = useQuasar();
        const destination = ref({} as Destination);

        const isCheck = () => {
            if(!destination.value.nom || !destination.value.url || !destination.value.description || !destination.value.titre || !destination.value.article) {
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
            var accepted = true // await gestionSolaire.destination.createAsync(destination.value);
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
            destination,
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
