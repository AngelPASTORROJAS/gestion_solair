<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between q-mb-lg">
      <p class="sub-title">Utilisateurs</p>
      <q-btn class="bouton-default" label="Créer" :to="{ name: 'utilisateur-create' }"></q-btn>
    </div>
    <q-table row-key="id"
      :columns="columns_utilisateurs"
      :rows="utilisateurs"
      :rows-per-page-options="[0]"
      :filter="filter"
      :filter-method="method_filter"
      no-data-label="Aucune donné n'a pu être trouvé"
      no-results-label="Aucune donné n'a pu être trouvé"
      table-style="max-height: 53em"
      table-header-class="bg-default"
      table-header-style="position:sticky; z-index:1; top:0; color: white; font-weight:blod"
      dense hide-bottom @row-click="onRowClick"
    >
      <template v-slot:header-cell-utilisateurs="props">
        <q-th :props="props">
          <div class="row items-center">
            <div>{{ props.col.label }}</div>
            <div class="col q-pl-md">
              <q-input dense rounded standout debounced="250"
                v-model="filter.utilisateur"
                label="Filtre"
                label-color="white"
                input-style="color: white"
                bg-color="pink-4"
              >
                <template v-slot:prepend>
                  <q-icon v-if="!filter.utilisateur" name="search" color="white"></q-icon>
                  <q-icon v-else name="close" color="white" @click="filter.utilisateur=''" class="cursor-pointer"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-th>
      </template>
      <template v-slot:header-cell-identifiant="props">
        <q-th :props="props">
          <div class="row items-center">
            <div>{{ props.col.label }}</div>
            <div class="col q-pl-md">
              <q-input dense rounded standout debounced="250"
                v-model="filter.login"
                label="Filtre"
                label-color="white"
                input-style="color: white"
                bg-color="pink-4"
              >
                <template v-slot:prepend>
                  <q-icon v-if="!filter.login" name="search" color="white"></q-icon>
                  <q-icon v-else name="close" color="white" @click="filter.login=''" class="cursor-pointer"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-th>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { Utilisateur } from 'src/api/utilisateur/utilisateur'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Utilisateurs-page',
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const filter = reactive({ utilisateur:'', login:'' });
    const utilisateurs = ref([] as Utilisateur[]);
    const columns_utilisateurs = [
      {
        name: 'utilisateurs', label: 'Utilisateurs', align: 'left',
        field: (result: Utilisateur) => (result.nom ?? '')+' '+(result.prenom ?? '')
      },
      {
        name: 'identifiant', label: 'Identifiant', align: 'left',
        field: (result: Utilisateur) => result.login
      }
    ];

    const isIncludes= (source:string, element:string) => {
      return source.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
        .includes(element.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
    }
    const method_filter = () => {
      return utilisateurs.value.filter(utilisateur =>
        (!filter.login || isIncludes(utilisateur.login, filter.login)) &&
        (!filter.utilisateur || isIncludes((utilisateur.nom??'')+(utilisateur.prenom??''), filter.utilisateur))
      );
    }
    const onRowClick = (evt: object, row: object) => {
      const utilisateurOnClick = row as Utilisateur;
      const reference = { name: 'utilisateur-edition', params: { id: utilisateurOnClick.id}};
      router.push(reference);
    }
    onMounted(async () => {
      try {
        $q.loading.show();
        // TODO: Ici récuperation des données par api
        // utilisateur.value = await gestionSolair.utilisateur.getUtilisateurAsync();
        utilisateurs.value = [{id:1, login:'Rocky',nom:'GALLAIRD',prenom:'Marco'}, {id:2, login:'Kookie',nom:'BONHOMME',prenom:'Frédérique'}] as Utilisateur[];
      } catch(e) {
        console.log(e);
      } finally {
        $q.loading.hide();
      }
    })

    return {
      utilisateurs,
      columns_utilisateurs,
      filter,
      method_filter: method_filter,
      onRowClick
    };
  }
})
</script>