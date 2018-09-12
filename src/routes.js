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

const UpdatePres = Loadable({
  loader: () => import('./views/Presiden/UpdatePres'),
  loading: Loading,
});

const UpdatePar = Loadable({
  loader: () => import('./views/Presiden/UpdatePar'),
  loading: Loading,
});

const NewPar = Loadable({
  loader: () => import('./views/Presiden/NewPar'),
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
//{ path: '/', name: 'Home', component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/users/list-user', name: 'Users', component: Users },
  { path: '/presiden/list-presiden', name: 'List Presiden', component: ListPresiden },
  { path: '/presiden/newpres', name: 'New Pres', component: NewPres },
  { path: '/presiden/updatepres', name: 'Update Pres', component: UpdatePres },
  { path: '/presiden/updatepar', name: 'Update Par', component: UpdatePar },
  { path: '/presiden/newpar', name: 'New Par', component: NewPar },
  { path: '/presiden/list-parpol', name: 'List Parpol', component: ListParpol },
  { path: '/hasil/hasil', name: 'Hasil', component: Hasil },
  { path: '/hasil/sengketa', name: 'Sengketa', component: Sengketa },
  { path: '/hasil/newhasil', name: 'New Hasil', component: NewHasil },
]; 

export default routes;
