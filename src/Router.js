import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import cookie from 'cookie'
import App from './components/Card'
import Login from './components/Login/login'
import SignUp from './components/Login/signup'
// import App from './App'

// Write checkAuth function here
// Check the cookies for a cookie called "loggedIn"
const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] ? true : false
}


// Write ProtectedRoute function here
const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => checkAuth()
            ? <Component {...props} />
            : <Redirect to="/login" />}
        />
    )
}


const Router = () => {
    return (
        <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={App} />
            
        </Switch>
    );
};

export default Router;