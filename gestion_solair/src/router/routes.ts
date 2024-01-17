import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { 
        path: 'Utilisateurs',
        component: () => import('pages/Utilisateurs.vue'),
        name: 'utilisateurs'
      },
      { 
        path: 'Criteres',
        component: () => import('pages/Criteres.vue'),
        name: 'criteres'
      },
      { 
        path: 'Destinations',
        component: () => import('pages/Destinations.vue'),
        name: 'destinations'
      },
      { 
        path: 'Create/Destination',
        component: () => import('pages/Creation/DestinationCreate.vue'),
        name: 'destination-create'
      },
      { 
        path: 'Create/Critere',
        component: () => import('pages/CritereCreate.vue'),
        name: 'critere-create'
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
