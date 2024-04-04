import NewUser from "./NewUser"
import Login from "./Login"
import { useState } from "react"

const Auth = ({handleUser, pass, handlePass, doLogin, isLoggedIn, createUser}) => {
	const [newAccount, setNewAccount] = useState(false)
	
	const toggleCreateAccount = () => setNewAccount(!newAccount)

	if (isLoggedIn) {
		return <></>
	} else if (newAccount) {
		return <NewUser handleUser={handleUser} pass={pass} handlePass={handlePass}
		toggleCreateAccount={toggleCreateAccount} 
		createUser={createUser}/>
	} else {
		return <Login doLogin={doLogin} handleUser={handleUser} pass={pass} handlePass={handlePass} toggleCreateAccount={toggleCreateAccount} />
	}
}

export default Auth