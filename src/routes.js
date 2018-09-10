import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}


const Users = Loadable({
  loader: () => import('./views/Users/ListUser'),
  loading: Loading,
});

const ListParpol = Loadable({
  loader: () => import('./views/Presiden/ListParpol'),
  loading: Loading,
});

const NewPres = Loadable({
  loader: () => import('./views/Presiden/NewPres'),
  loading: Loading,
});

const NewPar = Loadable({
  loader: () => import('./views/Presiden/NewPar'),
  loading: Loading,
});

const NewPut = Loadable({
  loader: () => import('./views/Presiden/NewPut'),
  loading: Loading,
});

const ListPresiden = Loadable({
  loader: () => import('./views/Presiden/ListPresiden'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Hasil = Loadable({
  loader: () => import('./views/Hasil/Hasil'),
  loading: Loading,
});

const Sengketa = Loadable({
  loader: () => import('./views/Hasil/HasilSengketa'),
  loading: Loading,
});

const NewHasil = Loadable({
  loader: () => import('./views/Hasil/NewHasil'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
 // { path: '/', name: 'Home', component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboard/users/list-user', name: 'Users', component: Users },
  { path: '/dashboard/presiden/list-presiden', name: 'List Presiden', component: ListPresiden },
  { path: '/dashboard/presiden/newpres', name: 'New Pres', component: NewPres },
  { path: '/dashboard/presiden/newput', name: 'New Put', component: NewPut },
  { path: '/dashboard/presiden/newpar', name: 'New Par', component: NewPar },
  { path: '/dashboard/presiden/list-parpol', name: 'List Parpol', component: ListParpol },
  { path: '/dashboard/hasil/hasil', name: 'Hasil', component: Hasil },
  { path: '/dashboard/hasil/sengketa', name: 'Sengketa', component: Sengketa },
  { path: '/dashboard/hasil/newhasil', name: 'New Hasil', component: NewHasil },
]; 

export default routes;
