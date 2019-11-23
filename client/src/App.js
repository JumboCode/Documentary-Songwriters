import React, { Component } from "react";
import NavBar from './NavBar'
import LoginForm from './Authentication/LoginForm'
import WelcomeBoard from './WelcomeBoard'
import Record from './Record'
import AuthPages from './AuthPages'
import PrivateRoute from './Authentication/PrivateRoute'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";



class App extends Component {
  constructor(props) {
    super(props)
    this.callBackendAPI = this.callBackendAPI.bind(this)
    this.state = {
      data: null
    }
  }
  //TODO: Fetch in react component tree
  componentDidMount() {
    this.callBackendAPI()
    .then(res => {
      this.setState({ data: res.express })
    })
    .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    console.log("Response body: ", body)
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <PrivateRoute path="/api">
            <AuthPages />
          </PrivateRoute>
        </Switch>
      </Router>
      
    </div>);
  }
}

export default App;