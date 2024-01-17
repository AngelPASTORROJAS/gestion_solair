<template>
  <q-page class="q-pa-lg">
    <p class="sub-title">Bienvenue sur l'application de gestion de solair</p>
    <ul class="selections row justify-evenly items-centers">
      <li>
        <q-btn class="bouton-custom" :to="{ name: 'utilisateurs' }">Utilisateurs</q-btn>
      </li>
      <li>
        <q-btn class="bouton-custom" :to="{ name: 'criteres' }">Critères</q-btn>
      </li>
      <li>
        <q-btn class="bouton-custom" :to="{ name: 'destinations' }">Destinations</q-btn>
      </li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage'
});
</script>

<style lang="scss">
.selections {
  list-style: none;
  gap: 15px;
  height: 50vh;
  align-items: center;
}
.bouton-custom {
  background-color: $cta;
  color: white;
}
</style>
