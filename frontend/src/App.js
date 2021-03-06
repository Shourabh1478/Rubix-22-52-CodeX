import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser, getDoctors } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./views/layout/Navbar";
import Landing from "./views/layout/Landing";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import PrivateRoute from "./views/private-route/PrivateRoute";
import Dashboard from "./views/dashboard/Dashboard";
import Doctors from "./views/doctors/Doctors";
import appointments from "./views/appointments/Appointments.js";
import Book from "./views/book/Book";


import "./App.css";
import Appointments from "./views/appointments/Appointments";
import Schedules from "./views/schedules/Schedules";
import UserInfo from "./views/userInfo/UserInfo";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      allDoctors : getDoctors(),
    };
  }
//  zmxmz,x
  // componentDidMount() {
  //   const getDoctorsData = async () => {
  //     this.setState(
  //       allDoctors : getDoctors(), 
  //     )
  // }
  // getDoctorsData();
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/doctors" component={Doctors} />
              <PrivateRoute exact path="/appointment" component={Appointments} />
              <PrivateRoute exact path="/book" component={Book} />
              <PrivateRoute exact path="/book/:docname" component={Book} />
              <PrivateRoute exact path="/schedules" component={Schedules} />
              <PrivateRoute exact path="/userinfo" component={UserInfo} />

              


            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
