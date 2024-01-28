import userServices from '../services/user'

const NewUser = ({user, handleUser, pass, handlePass, doLogin, isLoggedIn, toggleCreateAccount, createUser}) => {
	
	
    return (
        <div className="CreateAccountForm">
            <form onSubmit={toggleCreateAccount} className='Consumable-form'>
                <h3>Create new account</h3>
                <div>
                <label for="username">Username:</label>
                    <input id="username" name="username" defaultValue={user} onChange={handleUser} />
                </div>
                <div>
                <label for="password">Password:</label>
                    <input type="password" id="password" name="password" defaultValue={pass} onChange={handlePass} />
                </div>
                <div className="Login-button">
                    <button type="submit" onClick = {createUser}>Create Account</button>
                </div>
                
            </form>
            <div className="swap-account-button">
                <button onClick = {toggleCreateAccount}>Login with existing user</button>
            </div>

        </div>
    )
	
}

export default NewUser