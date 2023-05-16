

const Login = ({user, handleUser, pass, handlePass, doLogin, isLoggedIn}) => {
	
	if (!isLoggedIn) {
		return (
			<div className="Login">
				<div className="Login-button"><button onClick = {doLogin}>Login placeholder</button></div>
				</div>
		)
	} else {
		return <></>
	}


/* 	return (
  <div>
		<h2>Login:</h2>
		<form onSubmit = {doLogin}>
			<div>
				username: <input value = {user} onChange={handleUser} />
				password: <input type ={"password"} value = {pass} onChange = {handlePass}/>
			</div>
			<button type ='submit'>login</button>
		</form>
  </div> 
)*/
}

export default Login