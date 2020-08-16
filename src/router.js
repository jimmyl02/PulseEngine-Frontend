import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthenticatedRoute from './components/AuthenticatedRoute';

import Splash from './containers/Splash';
import Login from './containers/Login';
import Register from './containers/Register';
import Home from './containers/Home';
import Owned from './containers/Owned';
import Participating from './containers/Participating';
import Create from './containers/Create';
import Competition from './containers/Competition';

const RootRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Splash} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <AuthenticatedRoute path='/home' component={Home} />
                <AuthenticatedRoute path='/owned' component={Owned} />
                <AuthenticatedRoute path='/participating' component={Participating} />
                <AuthenticatedRoute path='/create' component={Create} />
                <AuthenticatedRoute path='/competition/:compId' component={Competition} />
            </Switch>
        </BrowserRouter>
    );
};

export default RootRouter;