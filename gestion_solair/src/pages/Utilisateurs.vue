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
      table-header-class="bg-primary"
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
                label="Filter"
                label-color="white"
                input-style="color: white"
                bg-color="secondary"
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
                v-model="filter.identifiant"
                label="Filter"
                label-color="white"
                input-style="color: white"
                bg-color="secondary"
              >
                <template v-slot:prepend>
                  <q-icon v-if="!filter.identifiant" name="search" color="white"></q-icon>
                  <q-icon v-else name="close" color="white" @click="filter.identifiant=''" class="cursor-pointer"></q-icon>
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
    const filter = reactive({ utilisateur:'', identifiant:'' });
    const utilisateurs = ref([] as Utilisateur[]);
    const columns_utilisateurs = [
      {
        name: 'utilisateurs', label: 'Utilisateurs', align: 'left',
        field: (result: Utilisateur) => (result.nom ?? '')+' '+(result.prenom ?? '')
      },
      {
        name: 'identifiant', label: 'Identifiant', align: 'left',
        field: (result: Utilisateur) => result.identifiant
      }
    ];

    const isIncludes= (source:string, element:string) => {
      return source.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
        .includes(element.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
    }

    const method_filter = () => {
      return utilisateurs.value.filter(utilisateur =>
        (!filter.identifiant || isIncludes(utilisateur.identifiant, filter.identifiant)) &&
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
        utilisateurs.value = [{id:1, role:'admin', identifiant:'q',nom:'pastor',prenom:'robert', mail:'ds'}, {id:2, role:'', identifiant:'kikoui',nom:'rojas',prenom:'gabrielle', mail:'ds'}] as Utilisateur[];
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