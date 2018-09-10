import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from "./middleware/middleware-route";
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
import Users from './views/Users/ListUser';
import Dashboard from './views/Dashboard';
// Pages
import { Login, Page404 } from './views/Pages';
import Loadable from 'react-loadable'
// import { renderRoutes } from 'react-router-config';

function Loading() {
  return <div>Loading...</div>;
}


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

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route path="/404" component={Page404} />
          <PrivateRoute path="/dashboard" name="Dashboard" component={Dashboard && DefaultLayout} roles={["admin", "user"]} />
          <PrivateRoute path="/users/list-user" name="Users" component={Users && DefaultLayout} roles={["admin", "user"]} />
          <PrivateRoute path="/presiden/list-presiden" name="Users" component={ListPresiden && DefaultLayout} roles={["admin", "user"]} />
          <PrivateRoute path= '/presiden/newpres' name= 'New Pres' component= {NewPres && DefaultLayout} roles={["admin", "user"]} />
          <PrivateRoute path= '/presiden/newput' name= 'New Put' component= {NewPut && DefaultLayout} roles={["admin", "user"]}/>
          <PrivateRoute path= '/presiden/newpar' name= 'New Par' component= {NewPar && DefaultLayout} roles={["admin", "user"]}/>
          <PrivateRoute path= '/presiden/list-parpol' name= 'List Parpol' component= {ListParpol && DefaultLayout} roles={["admin", "user"]}/>
          <PrivateRoute path= '/hasil/hasil' name= 'Hasil' component= {Hasil && DefaultLayout} roles={["admin", "user"]}/>
          <PrivateRoute path= '/hasil/sengketa' name= 'Sengketa' component= {Sengketa && DefaultLayout} roles={["admin", "user"]}/>
          <PrivateRoute path= '/hasil/newhasil' name= 'New Hasil' component= {NewHasil && DefaultLayout} roles={["admin", "user"]}/>
          <Redirect from="/" to="/login" />
        </Switch>
      </HashRouter> 
    );
  }
}

export default App;
