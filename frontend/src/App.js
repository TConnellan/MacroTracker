import Header from './components/Header';
import bread from './bread_logo_transparent.png';
import Auth from './components/Auth'
import consumedServices from './services/consumed'
import userServices from './services/user'
import './App.css';
import {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar';
import Display from './components/Display';


const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [consumed, setConsumed] = useState([])
  const [consumedDate, setConsumedDate] = useState('')
  const [updateConsumed, setUpdateConsumed] = useState(false)
  const [sidebarChoice, setSidebarChoice] = useState("Macros")


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

  const createUser = (event) => {
    event.preventDefault()
    userServices.postNewUser({username: user, password: pass})
                .then(resp => {
                  // successfully create user,
                  setPass('')
                  setToken(resp.data.token)
                  setUserId(resp.data.id)
                  setUser(resp.data.username)
                  setLoggedIn(true)
                })
                .catch

  }

  const doLogin = (event) => {
    event.preventDefault()
    
    userServices.loginUser({username: user, password: pass})
      .then(resp => {
        setPass('')
        setToken(resp.data.token)
        setLoggedIn(true)
        setUserId(resp.data.id)
        setUser(resp.data.username)
        setUpdateConsumed(!updateConsumed)
      })
      .catch(resp => {
        // actually handle it here
        console.log("There was a problem logging in")
      })
  }

  const submitConsumed = (data) => {
    consumedServices.postConsumedEvent({...data, user_id: userId}, token)
      .then(() => toggleUpdateConsumed()) // Not ideal maybe, whole request to get new consumed when we could update the state based on response
  }

  const toggleUpdateConsumed = () => {
    console.log("toggling consumed data, expect to see request sent");
    setUpdateConsumed(!updateConsumed)
  }

  const removeConsumedEntry = (id) => {
    consumedServices.deleteConsumedEvent(id, token)
        .then(setConsumed(prevCons => prevCons.filter(cons => cons.id != id)))
    // might want to always remove from local list anyway
}

  useEffect(() => {
    console.log("use effect toggling")
    if (userId) {
      consumedServices.getAllConsumedByDate(userId, consumedDate, token)
        .then(initialData => {
          setConsumed(initialData)
        })
    }
  }, [updateConsumed])

  const updateSidebarChoice = (choice) => {
    setSidebarChoice(choice)
    if (choice == "Macros") {
      toggleUpdateConsumed()
    }
  }
    
  if (loggedIn) {
    return (
      <div className="App">
        <Header logo = {bread}/>
        <div id="Container">
          <div id="Sidebar">
            <Sidebar updateSidebarChoice={updateSidebarChoice}/>
          </div>
          <div id="display">
            <Display sidebarChoice={sidebarChoice} 
                    user={user} 
                    token={token}
                    consumed={consumed} 
                    consumedDate={consumedDate} 
                    setConsumed={setConsumed} 
                    createConsumable={consumedServices.postNewConsumable}
                    removeConsumedEntry={removeConsumedEntry}
                    createConsumed={submitConsumed}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header logo = {bread}/>
        <Auth user = {user} 
              handleUser = {handleUser} 
              pass = {pass} 
              handlePass = {handlePass} 
              doLogin = {doLogin} 
              isLoggedIn = {loggedIn}
              createUser = {createUser}/>
      </div>
    )
  }
}

export default App;
