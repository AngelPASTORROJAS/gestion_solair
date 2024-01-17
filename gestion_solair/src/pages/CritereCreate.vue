<template>
    <q-page class="q-pa-lg">
        <p class="sub-title">Critère / Création</p>
        <q-form @submit="onSubmit">
            <div class="row bg-pink-4">
                <q-list class="col-12" bordered padding>
                    <q-expansion-item default-opened expand-separator label="Informations du critère">
                        <q-item>
                            <div class="col-12">
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Nom"
                                    v-model="critere.nom"
                                ></InputCustom>
                                <InputCustom max="255" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Description"
                                    v-model="critere.description"
                                ></InputCustom>
                            </div>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
            <ul class="selections row justify-evenly">
                <li>
                    <q-btn class="bouton-default2" :to="{ name: 'criteres' }">Précedent</q-btn>
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
import { Critere } from 'src/api/critere/critere';

export default defineComponent ({
    name: 'Critere-create',
    setup() {
        const $q = useQuasar();
        const critere = ref({} as Critere);

        const isCheck = () => {
            if(!critere.value.nom || !critere.value.description) {
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
            var accepted = true // await gestionSolaire.critere.createAsync(critere.value);
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
            critere,
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
