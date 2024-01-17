import NewUser from "./NewUser"
import Login from "./Login"
import { useState } from "react"

const Auth = ({user, handleUser, pass, handlePass, doLogin, isLoggedIn, createUser}) => {
	const [newAccount, setNewAccount] = useState(false)
	
	const toggleCreateAccount = () => {
		console.log(`toggling create account mode to ${!newAccount}`)
		setNewAccount(!newAccount)
	}

	if (isLoggedIn) {
		return <></>
	} else if (newAccount) {
		return <NewUser doLogin={doLogin} user={user} handleUser={handleUser} pass={pass} handlePass={handlePass}
		toggleCreateAccount={toggleCreateAccount} 
		createUser={createUser}/>
	} else {
		return <Login doLogin={doLogin} user={user} handleUser={handleUser} pass={pass} handlePass={handlePass} toggleCreateAccount={toggleCreateAccount} />
	}



	// if (!isLoggedIn) {
	// 	return (
	// 		<div className="Login">
	// 			<div className="Login-button"><button onClick = {doLogin}>Login placeholder</button></div>
	// 			</div>
	// 	)
	// } else {
	// 	return <></>
	// }


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

export default Auth