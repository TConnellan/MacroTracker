import Header from './components/Header';
import bread from './bread_logo_transparent.png';
import SearchForm from './components/SearchForm'
import Login from './components/Login'
import Totals from './components/Totals';
import consumedServices from './services/consumed'
import './App.css';
import {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar';
import Display from './components/Display';


const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [consumed, setConsumed] = useState([])
  const [consumedDate, setConsumedDate] = useState('')
  const [updateConsumed, setUpdateConsumed] = useState(false)
  const [cons, setCons] = useState({name:'',brand:'',size:0, units:'', carbs:0, fats:0,proteins:0})

  useEffect(() => {
    document.title = "MacroTracker"
  }, [])

  useEffect(() => {
    const today = Date()
    setConsumedDate(today)
  }, [])
  
  useEffect(() => {
    console.log(`Set todays date: ${consumedDate}`)
  }, [consumedDate])

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
    setUser(1)
    console.log(`Id set to: ${1}`);
    setLoggedIn(!loggedIn)
  }

  const toggleLogIn = (event) => {
    event.preventDefault()
    setLoggedIn(!loggedIn)
  }

  const toggleUpdateConsumed = () => {
    console.log("toggling consumed data, expect to see request sent");
    setUpdateConsumed(!updateConsumed)
  }

  useEffect(() => {
    if (user) {
      consumedServices.getAllConsumedByDate(user, consumedDate)
        .then(initialData => {
          setConsumed(initialData)
          console.log(initialData)
        })
    }
  }, [updateConsumed])
    

  return (
    <div className="App">
      <Header logo = {bread}/>
      <Login user = {user} handleUser = {handleUser} pass = {pass} handlePass = {handlePass} doLogin = {doLogin} isLoggedIn = {loggedIn}/>
      <div id="Container">
        <div id="Sidebar">
          <Sidebar buttonLabels={["Todays Macros", "History", "Statistics", "Friends"]} isLoggedIn={loggedIn} todaysMacrosClick={toggleUpdateConsumed}/>
        </div>
        <div id="display">
          <Display isLoggedIn={loggedIn} user={user} consumed={consumed} consumedDate={consumedDate} setConsumed={setConsumed} cons={cons}setCons={setCons}/>
        </div>
      </div>
    </div>
  );
}
//<SearchForm value = {searchValue} onChange={handleSearch} onSubmit = {submitSearch}/>
//<Totals isLoggedIn = {loggedIn}/>

export default App;
