
const NewUser = ({user, handleUser, pass, handlePass, toggleCreateAccount, createUser}) => {
	
	
    return (
        <div className="CreateAccountForm">
            <form onSubmit={toggleCreateAccount} className='Login'>
                <h3>Create New Account:</h3>
                <label for="username">Username:</label>
                    <input id="username" name="username" maxlength="20" defaultValue={user} onChange={handleUser} />

                <label for="password">Password:</label>
                    <input type="password" id="password" name="password" maxlength="100" defaultValue={pass} onChange={handlePass} />
                    <button className="Login-button" type="submit" onClick = {createUser}>Create Account</button>
                
            </form>
                <button className="swap-account-button" onClick = {toggleCreateAccount}>Login with existing user</button>
        </div>
    )
	
}

export default NewUser