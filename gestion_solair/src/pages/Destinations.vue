<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between">
      <p class="sub-title">Destinations</p>
      <q-btn class="bouton-default" label="Créer" :to="{ name: 'destination-create' }"></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Destinations-page'
})
</script>