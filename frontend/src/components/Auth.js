import NewUser from "./NewUser"
import Login from "./Login"
import { useState } from "react"
import userServices from '../services/user'
import userActions from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import { setConsumedStartDate, setConsumedEndDate} from '../reducers/consumedReducer'

const Auth = ({setLoggedIn, updateConsumed}) => {
	const [newAccount, setNewAccount] = useState(false)
	const [user, setUser] = useState('')
	const [pass, setPass] = useState('')
	const [loginError, setLoginError] = useState('')

	const dispatch = useDispatch()
	
	const toggleCreateAccount = () => setNewAccount(!newAccount)

	const handlePass = (event) => {
		event.preventDefault()
		setPass(event.target.value)
	  }

	const handleUser = (event) => {
		event.preventDefault()
		setUser(event.target.value)
	  }

	const doLogin = (event) => {
		event.preventDefault()
		
		userServices.loginUser({username: user, password: pass})
		  .then(resp => {
			setPass('')
			setLoginError('')
			setLoggedIn(true)
			dispatch(userActions.setUser(resp.data.username))
			var todayStart = new Date()
			var todayEnd = new Date()
			todayStart.setUTCHours(0,0,0,0)
			todayEnd.setUTCHours(23,59,59,999)
			dispatch(setConsumedStartDate(todayStart))
			dispatch(setConsumedEndDate(todayEnd))
			updateConsumed()

			// const today = Date()
			// dispatch(setConsumedDate(today))
			// setUpdateConsumed(!updateConsumed)
		  })
		  .catch(resp => {
			// actually handle it here
			setLoginError("There was a problem logging in, please try again.")
		  })
	  }

	const createUser = (event) => {
		event.preventDefault()
		userServices.postNewUser({username: user, password: pass})
					.then(resp => {
					  // successfully created user
					  setPass('')
					  dispatch(userActions.setUser(resp.data.username))
					  setLoggedIn(true)
					})
					.catch(err => {
					  if (err.response.status == 409) {
						alert("Username already exists, please pick another")
					  } else if (err.response.status == 403) {
						alert("There was a problem creating your account, please try again later")
					  }        
					})
	  }

	if (newAccount) {
		return <NewUser handleUser={handleUser} 
						pass={pass} 
						handlePass={handlePass}
						toggleCreateAccount={toggleCreateAccount} 
						createUser={createUser}/>
	} else {
		return <Login doLogin={doLogin} 
					  handleUser={handleUser}
					  user={user} 
					  pass={pass} 
					  handlePass={handlePass} 
					  toggleCreateAccount={toggleCreateAccount}
					  loginError={loginError} />
	}
}

export default Auth