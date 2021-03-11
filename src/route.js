import React from 'react';

const Login = React.lazy(() => import('./Pages/Authentication/SignIn/SignIn'));
const Recover = React.lazy(() => import('./Pages/Authentication/Recover_pass/ResetPassword'));

const route = [
    { path: '/', exact: true, name: 'Login', component: Login },
    //{ path: '/auth/recovery', exact: true, name: 'Recover', component: Recover }
];

export default route;