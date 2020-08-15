import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = (props) => {
    const authToken = localStorage.getItem('authToken');

    if(authToken){
        return (
            <Route {...props} />
        );
    }else{
        return (
            <Redirect to='/login' />
        );
    }
};

export default AuthenticatedRoute;