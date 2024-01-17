<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-default">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-center">
          <a href="#">Gestion Solair</a>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Gestion Solair
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Accueil',
    caption: 'Accueil',
    icon: 'home',
    link: '#'
  },
  {
    title: 'Critères',
    caption: 'Criteres',
    icon: 'filter_list',
    link: '#/Criteres'
  },
  {
    title: 'Destinations',
    caption: 'Destinations',
    icon: 'travel_explore',
    link: '#/Destinations'
  },
  {
    title: 'Utilisateurs',
    caption: 'Utilisateurs',
    icon: 'groups',
    link: '#/Utilisateurs'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
  font-size: 2rem;
}
</style>
