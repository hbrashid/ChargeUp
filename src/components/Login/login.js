import React, { Component } from "react";
// import { Redirect } from "react-router";
import { TextField, Button, Container } from "@material-ui/core";

class App extends Component {
  state = {
    email: "",
    password: "",
  };

  handleTextChange = (e) => {
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  login = (e) => {
    e.preventDefault();
    // set cookie here
    // set loggedIn = true and max-age = 60*1000 (one minute)
    document.cookie = "loggedIn = true ; max-age = 60*1000";
  
  
  window.location.replace("/");
  this.loginAPI();
  };

  loginAPI = () => {

    const postData = { email: this.state.email, password: this.state.password };
    const loginUrl = "http://localhost:10240/account/login";

    fetch(loginUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "200") {
          this.props.sendMessage(`You are logged in as ${data.email}`)
          this.bake_cookie("player", data)
          this.props.addUser(data)
          this.setState({
            loggingIn: false,
            registering: false
          })
        }        
          else {
            this.props.sendMessage("I'm not finding it")
            console.log("error code", data.code);
          }
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.props.sendMessage("Yikes. Check the logs");
      })
  }



  render() {
    return (
      <div className="App">
        <Container maxWidth="sm">
          <form className="login-form" onSubmit={this.login}>
            <TextField
              required
              onChange={this.handleTextChange}
              value={this.state.email}
              name="email"
              label="email"
              type="text"
            />
            <TextField
              required
              onChange={this.handleTextChange}
              value={this.state.password}
              name="password"
              label="password"
              type="password"
            />
            <Button
              type="submit"
              className="login-button"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default App;
