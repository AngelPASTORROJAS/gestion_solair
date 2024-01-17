<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between q-mb-lg">
      <p class="sub-title">Critères</p>
      <q-btn class="bouton-default" label="Créer" :to="{ name: 'critere-create' }"></q-btn>
    </div>
    <q-table row-key="id"
      :columns="columns_criteres"
      :rows="criteres"
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
      <template v-slot:header-cell-criteres="props">
        <q-th :props="props">
          <div class="row items-center">
            <div> {{ props.col.label }}</div>
            <div class="col q-pl-md">
              <q-input dense rounded standout debounced="250"
                v-model="filter"
                label="Filtre"
                label-color="white"
                input-style="color: white"
                bg-color="pink-4"
              >
                <template v-slot:prepend>
                  <q-icon v-if="!filter" name="search" color="white"></q-icon>
                  <q-icon v-else name="close" color="white" @click="filter=''" class="cursor-pointer"></q-icon>
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
import { defineComponent, ref, onMounted } from 'vue';
import { Critere } from 'src/api/critere/critere';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Criteres-page',
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const filter = ref('');
    const criteres = ref([] as Critere[]);
    const columns_criteres = [
      {
        name: 'criteres',
        label: 'Critères',
        align: 'left',
        field: (result: Critere) => result.nom
      }
    ];

    const isIncludes= (source:string, element:string) => {
      return source.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
        .includes(element.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
    }
  
    const method_filter = () => {
      return criteres.value.filter( critere => !filter.value || isIncludes(critere.nom, filter.value));
    }

    const onRowClick = (evt: object, row: object) => {
      const critereOnClick = row as Critere;
      const reference = { name: 'critere-edition', params: { id: critereOnClick.id}};
      router.push(reference);
    }

    onMounted(async () => {
      try {
        $q.loading.show();
        // TODO: Ici récuperation des données par api
        criteres.value = [{id:1, nom:'mer', description:"lieu près d'une plage"}, {id:2, nom:'montagne', description:'lieu à haut altitudes'}] as Critere[];
      } catch(e) {
        console.log(e);
      } finally {
        $q.loading.hide();
      }
    })

    return {
      criteres,
      columns_criteres,
      filter,
      method_filter: method_filter,
      onRowClick
    }
  }
})
</script>