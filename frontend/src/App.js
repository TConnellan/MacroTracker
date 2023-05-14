import Header from './components/Header';
import bread from './bread_logo_transparent.png';
import SearchForm from './components/SearchForm'
import Login from './components/Login'
import './App.css';
import {useState} from 'react'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

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

  return (
    <div className="App">
      <Header logo = {bread}/>
      <Login user = {user} handleUser = {handleUser} pass = {pass} handlePass = {handlePass} doLogin = {doLogin}/>
      <SearchForm value = {searchValue} onChange={handleSearch} onSubmit = {submitSearch}/>
    </div>
  );
}

export default App;
