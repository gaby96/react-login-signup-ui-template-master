import React, { Component } from "react";
import { FormErrors } from './formerrors';
export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            formErrors: {username: '', password: '', email:''},
      usernameValid: false,
      passwordValid: false,
      emailValid: false,
      formValid: false
          }

          
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let emailValid = this.state.emailValid;
    
        switch(fieldName) {
          case 'username':
            usernameValid = value.length >= 7;
            fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        usernameValid: usernameValid,
                        passwordValid: passwordValid,
                        emailValid:    emailValid
                      }, this.validateForm);
      }

      validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? ' ' : 'has-error');
      };


    render() {
        return (
            <form>
                <h3>Sign Up</h3>
                <FormErrors formErrors={this.state.formErrors} />
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={this.handleUserInput} className="form-control" name= "username" placeholder="Username" />
                </div>

                <div className={`form-group
                 ${this.errorClass(this.state.formErrors.email)}`}>
                    <label>Email address</label>
                    <input type="email" value={this.state.email} name="email" onChange={this.handleUserInput} className="form-control" placeholder="Enter email" />
                </div>

                <div className={`form-group
                 ${this.errorClass(this.state.formErrors.password)}`}>
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handleUserInput} name="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" disabled={!this.state.formValid} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}