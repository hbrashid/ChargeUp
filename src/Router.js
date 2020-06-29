import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import cookie from 'cookie'
import WeatherCard from './components/Card'
import Login from './components/Login/Login'

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
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={WeatherCard} />
            
        </Switch>
    );
};

export default Router;