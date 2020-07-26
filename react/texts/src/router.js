import React from 'react'
import App from './App';
import Containers from './components/containers'
import Mains from './views/mains'
import Account from './views/accounts'
import Login from './views/login'
import Register from './views/register'
import { Route, Switch, withRouter, BrowserRouter } from 'react-router-dom'


function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={withRouter(App)} />
        <Route exact path="/manage"  render={() => {
          return (
            <Containers>
              <Mains />
            </Containers>
          )
        }}  />
       
        <Route exact path="/account"  render={() => {
          return (
            <Containers>
              <Account />
            </Containers>
          ) 
        }} />
        <Route exact path="/login" render={() => {
          return (
            <Containers access={true}>
              <Login />
            </Containers>
          ) 
        }} /> 
        <Route exact path="/register"  render={() => {
          return (
            <Containers access={true}>
              <Register />
            </Containers>
          ) 
        }} />
      </Switch>
    </BrowserRouter>
  )
}
export default Routers

// function Routers() {
//   console.log('world');
//   return (
//     <Router>
//       <>
//       <Route parent={Containers} path="/manage" component={Mains}/>
//       </>
//     </Router>
//   )

// }
// export default Routers

