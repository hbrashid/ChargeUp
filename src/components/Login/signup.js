import React, { Component } from "react";
// import { Redirect } from "react-router";
import { TextField, Button, Container } from "@material-ui/core";



class App extends Component {
    state = {
      email: "",
      password: "",
    };

    handleTextChange = (e) => {
        const state = { ...this.state }
        state[e.target.name] = e.target.value
        this.setState(state)
      }


    registerUser = () => {

    const postData = { email: this.state.email, password: this.state.password };
    const registerUrl = "http://localhost:10240/account/register";

    console.log(postData);
    fetch(registerUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "200") {
          this.props.sendMessage(`You are registered as ${this.state.email}. You can login now!`)
          this.setState({
            loggingIn: false,
            registering: false
          })
        } else {
          if(data.error.errno==1062) this.props.sendMessage("There's already somebody using that username or email address!");
          console.log("error code", data);
        } 

      })
      .catch((error) => {
        console.log('Error: ', error);
 
      })
    }
    register = (e) => {
        e.preventDefault()
        this.setState({
        
        })
    
        this.registerUser();
      }


    

    render() {
        return (
          <div className="App">
            <Container maxWidth="sm">
              <form className="login-form" onSubmit={this.register}>
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
                  Sign Up
                </Button>
              </form>
            </Container>
          </div>
  );
}
}

export default App
