import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard'));
const CreateCard = React.lazy(() => import('./Pages/Dashboard/createCard'));
const UpdateCard = React.lazy(() => import('./Pages/Dashboard/updateCard'));
const Logout = React.lazy(() => import('./Pages/Dashboard/logout'));


const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/createCard', exact: true, name: 'CreateCard', component: CreateCard },
    { path: '/updateCard', exact: true, name: 'UpdateCard', component: UpdateCard },
    { path: '/logout', exact: true, name: 'Logout', component: Logout },
  /*  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard }, */
 
];

export default routes;