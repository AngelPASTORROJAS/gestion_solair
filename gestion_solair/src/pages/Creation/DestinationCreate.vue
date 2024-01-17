<template>
    <q-page class="q-pa-lg">
        <p class="sub-title">Destinations / Création</p>
        <q-form @submit="onSubmit">
            <div class="row bg-pink-4">
                <q-list class="col-12" bordered padding>
                    <q-expansion-item default-opened expand-separator label="Informations de la destination">
                        <q-item>
                            <div class="col-12">
                                <InputCustom max="75" mention="Obligatoire" 
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
                                <InputCustom max="10" mention="Obligatoire" 
                                    :rules="[(val) => !!val]"
                                    label="Ville"
                                    v-model="destination.ville"
                                ></InputCustom>
                            </div>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
        </q-form>
    </q-page>
</template>

<script lang="ts">
import InputCustom from 'src/components/InputCustom.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent ({
    name: 'Destinations-create',
    setup() {
        const destination = ref({} as Destination)
        return {
            destination,
        };
    },

    components: {
        InputCustom,
    }
})
</script>