import actions from "./store/actions";
import React, {Component} from 'react';
import axios from "axios/index";
import {URL_API} from "./store/constants";
import {connect} from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    console.log(props)
  }

  updateInputValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    event.preventDefault();

    axios.post(`${URL_API}/auth/login/`, this.state)
      .then(res => {

        const token = res.data["token"];
        this.props.setToken(token);
        //localStorage.setItem("token", token);

        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>

        <form onSubmit={data => this.submitForm(data)}>
          <label htmlFor="name">username</label>
          <input type="text"
                 name="username"
                 id="username"
                 onChange={data => this.updateInputValue(data)}/>
          <br/>

          <label htmlFor="image">password</label>
          <input type="text"
                 name="password"
                 id="password"
                 onChange={data => this.updateInputValue(data)}/>
          <br/>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
  };
}

Login = connect(store => store, actions)(Login);

export default Login;