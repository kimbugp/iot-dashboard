import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Dashboard from './components/DashBoard'
import ScrollToTop from './components/ScrollTop'
import notFound from './components/NotFound'
import LandingPage from './components/LandingPage';
import { Authenticate, authentication } from './authentication';

export default props => (
  <BrowserRouter >
    <ScrollToTop>
      <Switch>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/' component={LandingPage} />
        <Route component={notFound} exact strict />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
)

export const PrivateRoute = ({ component: Component,...rest }) => (
  <Route {...rest} render={props => {
    const isLoggedIn = Authenticate()
    if (isLoggedIn === false) {
      authentication.signout()
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
    return <Component {...props} />
  }} />
)