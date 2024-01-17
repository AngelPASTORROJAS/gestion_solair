<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between q-mb-lg">
      <p class="sub-title">Destinations</p>
      <q-btn class="bouton-default" label="Créer" :to="{ name: 'destination-create' }"></q-btn>
    </div>
    <q-table row-key="id"
      :columns="columns_destinations"
      :rows="destinations"
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
      <template v-slot:header-cell-destinations="props">
        <q-th :props="props">
          <div class="row items-center">
            <div>{{ props.col.label }}</div>
            <div class="col q-pl-md">
              <q-input dense rounded standout debounced="250"
                v-model="filter.nom"
                label="Filtre"
                label-color="white"
                input-style="color: white"
                bg-color="secondary"
              >
                <template v-slot:prepend>
                  <q-icon v-if="!filter.nom" name="search" color="white"></q-icon>
                  <q-icon v-else name="close" color="white" @click="filter.nom=''" class="cursor-pointer"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-th>
      </template>
      <template v-slot:header-cell-ville="props">
        <q-th :props="props">
          <div class="row items-center">
            <div>{{ props.col.label }}</div>
            <div class="col q-pl-md">
              <q-input dense rounded standout debounced="250"
                v-model="filter.ville"
                label="Filtre"
                label-color="white"
                input-style="color: white"
                bg-color="secondary"
              >
                <template v-slot:prepend>
                  <q-icon v-if="!filter.ville" name="search" color="white"></q-icon>
                  <q-icon v-else name="close" color="white" @click="filter.ville=''" class="cursor-pointer"></q-icon>
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
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Destination } from "src/api/destination/destination";

export default defineComponent({
  name: 'Destinations-page',
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const filter = reactive({ nom:'', ville:'' });
    const destinations = ref([] as Destination[]);
    const columns_destinations = [
      {
        name: 'destinations', label: 'Destinations', align: 'left',
        field: (result: Destination) => result.nom ?? ''
      },
      {
        name: 'ville', label: 'Ville', align: 'left',
        field: (result: Destination) => result.ville
      }
    ];

    const isIncludes= (source:string, element:string) => {
      return source.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
        .includes(element.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
    }

    const method_filter = () => {
      return destinations.value.filter(destination =>
        (!filter.nom || isIncludes(destination.nom, filter.nom)) &&
        (!filter.ville || isIncludes(destination.ville, filter.ville))
      );
    }

    const onRowClick = (evt: object, row: object) => {
      const destinationOnClick = row as Destination;
      const reference = { name: 'destination-edition', params: { id: destinationOnClick.id}};
      router.push(reference);
    }

    onMounted(async () => {
      try {
        $q.loading.show();
        // TODO: Ici récuperation des données par api
        destinations.value = [{id:1, nom:'Pas-de-callais', ville:'62000'}, {id:2, nom:'Lille', ville:'59000'}] as Destination[];
      } catch(e) {
        console.log(e);
      } finally {
        $q.loading.hide();
      }
    })

    return {
      destinations,
      columns_destinations,
      filter,
      method_filter: method_filter,
      onRowClick
    };
  }
})
</script>