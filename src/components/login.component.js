import React, { Component } from "react";
import { FormErrors } from './formerrors';
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
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
    
        switch(fieldName) {
          case 'username':
            usernameValid = value.length >= 7;
            fieldValidationErrors.username = usernameValid ? '' : ' should be more than 7 characters';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        usernameValid: usernameValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }

      validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? ' ' : 'has-error');
      }

      handleClick(){
          if(this.state.username && this.state.password){
            this.props.history.push('/blog/')   
          }
      }

      render(){
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
            {/* <div className="image" alt="">
                <img src={loginImg} />
            </div> */}
            <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
            <div className="form">
                <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                    <label htmlFor="username">UserName</label>
                    <input type="text" value={this.state.username} name="username" placeholder="Username" onChange={this.handleUserInput} ></input>
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={this.handleUserInput} value={this.state.password} name="password" placeholder="password"></input>
                </div>
            </div>

            </div>
        <div className="footer">
            <button type="submit" disabled={!this.state.formValid} onClick={() => this.handleClick()} className="bth">Login</button>
        </div>
        </div>

    }
}
