import userServices from '../services/user'

const NewUser = ({user, handleUser, pass, handlePass, doLogin, isLoggedIn, toggleCreateAccount}) => {
	
	if (!isLoggedIn) {
		return (
			<div className="CreateAccountForm">
				<form onSubmit={doLogin} className='Consumable-form'>
					<h3>
						Login:
					</h3>
					<div>
					<label for="username">Username:</label>
						<input id="username" name="username" defaultValue={user} onChange={handleUser} />
					</div>
					<div>
					<label for="password">Password:</label>
						<input type="password" id="password" name="password" defaultValue={pass} onChange={handlePass} />
					</div>
					<div className="Login-button">
						<button type="submit" onClick = {doLogin}>Login</button>
					</div>
				</form>
				<div className="swap-account-button">
                <button onClick = {toggleCreateAccount}>Create New Account</button>
            </div>
			</div>
		)
	} else {
		return <></>
	}
}

export default NewUser