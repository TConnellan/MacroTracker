

const Login = ({user, handleUser, pass, handlePass, doLogin}) => (
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
)


export default Login