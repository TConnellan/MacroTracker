import Header from './components/Header';
import bread from './bread_logo_transparent.png';
import SearchForm from './components/SearchForm'
import Login from './components/Login'
import Totals from './components/Totals';
import './App.css';
import {useState, useEffect} from 'react'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    document.title = "MacroTracker"
  }, [])

  const handleUser = (event) => {
    event.preventDefault()
    setUser(event.target.value)
  }
  
  const handlePass = (event) => {
    event.preventDefault()
    setPass(event.target.value)
  }

  const handleSearch = (event) => {
    //console.log("updating search value", event.target.value.toLowerCase())
    setSearchValue(event.target.value.toLowerCase())
  }

  const submitSearch = (event) => {
    event.preventDefault()
    // search through food items
  }

  const doLogin = (event) => {
    event.preventDefault()
  }

  const toggleLogIn = (event) => {
    event.preventDefault()
    setLoggedIn(!loggedIn)
  }

  return (
    <div className="App">
      <Header logo = {bread}/>
      <Login user = {user} handleUser = {handleUser} pass = {pass} handlePass = {handlePass} doLogin = {toggleLogIn} isLoggedIn = {loggedIn}/>
      <SearchForm value = {searchValue} onChange={handleSearch} onSubmit = {submitSearch}/>
      <Totals isLoggedIn = {loggedIn}/>
    </div>
  );
}

export default App;
