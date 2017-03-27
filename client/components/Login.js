import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/user';
import Nav from './Nav';
import { browserHistory } from 'react-router';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
	}

	componentWillMount() {
    	this.props.loadUserFromToken();
  	}

	submitForm(e) {
		e.preventDefault();
		// validate the username/password
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;
		this.props.submitLogin(username, password);
	}

	render() {
		return (
			<div>
			<Nav />
			<h1>Login</h1>
				<form >
				<label>username</label>
				<input type="text" name="username" ref={ref => this.usernameInput = ref}/>
				<label>password</label>
				<input type="password" name="password" ref={ref => this.passwordInput = ref}/>
					<button type="button" onClick={this.submitForm}>submit</button>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	submitLogin: (username, password) => {
  		dispatch(actions.login(username, password));
  	},
	loadUserFromToken: () => {
	 	let token = sessionStorage.getItem('jwtToken');
	 	if(!token || token === '') {//if there is no token, dont bother
	 		return;
	 	}
		 //fetch user from token (if server deems it's valid token)
	  	dispatch(actions.meFromToken(token))
	    .then((response) => {
	    	console.log("Login", response); // undefined
	      if (!response) {
	      	//reset token (possibly new token that was regenerated by the server)
	      	sessionStorage.setItem('jwtToken', response.payload.data.token);
	        dispatch(actions.meFromTokenSuccess(response.payload));
	      } else {
	      	sessionStorage.removeItem('jwtToken');//remove token from storage
	        dispatch(actions.meFromTokenFailure(response.payload));
	      }
	    });
	},
	resetMe: () =>{
	 	sessionStorage.removeItem('jwtToken'); //remove token from storage
	 	dispatch(actions.resetToken());
	 }
  }
}

export default connect(null, mapDispatchToProps)(Login);