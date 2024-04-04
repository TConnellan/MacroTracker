import { useSelector } from 'react-redux';


const Login = ({handleUser, pass, handlePass, doLogin, isLoggedIn, toggleCreateAccount}) => {
	
	const user = useSelector(state => state.user.username)

	if (!isLoggedIn) {
		return (
			<div className="CreateAccountForm">
				<form onSubmit={doLogin} className='Login'>
					<h3>
						Login:
					</h3>
					<div>
					<label for="username">Username:</label>
						<input id="username" name="username" maxlength="20" defaultValue={user} onChange={handleUser} />
					</div>
					<div>
					<label for="password">Password:</label>
						<input type="password" id="password" name="password" maxlength="100" defaultValue={pass} onChange={handlePass} />
					</div>
					<div >
						<button className="Login-button" type="submit" onClick = {doLogin}>Login</button>
					</div>
				</form>
                	<button className="swap-account-button" onClick = {toggleCreateAccount}>Create New Account</button>
			</div>
		)
	} else {
		return <></>
	}
}

export default Login