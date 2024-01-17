<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between">
      <p class="sub-title">Critères</p>
      <q-btn class="bouton-default" label="Créer" :to="{ name: 'critere-create' }"></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Criteres-page'
})
</script>