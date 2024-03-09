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
  const [tokenChecked, setTokenChecked] = useState(false)
  const [consumed, setConsumed] = useState([])
  const [consumedDate, setConsumedDate] = useState('')
  const [updateConsumed, setUpdateConsumed] = useState(false)
  const [sidebarChoice, setSidebarChoice] = useState("Macros")

  useEffect(() => {
    userServices.verifyLoggedIn()
                .then(resp => {
                  if (resp.status === 200) {
                    setPass('')
                    setUserId(resp.data.id)
                    setUser(resp.data.username)
                    setLoggedIn(true)
                    setUpdateConsumed(!updateConsumed)
                  } else if (resp.status === 500) {
                    console.log("There was an issue verifying authorisation")
                  }
                })
                .catch(err => {
                  console.log(err)
                })
                .finally(() => {
                  setTokenChecked(true)
                })
    
  }, [])

  useEffect(() => {
    document.title = "MacroTracker"
  }, [])

  useEffect(() => {
    const today = Date()
    setConsumedDate(today)
  }, [])
  
  useEffect(() => {
    if (consumedDate.toString() != '') {
      console.log(`Set todays date: ${consumedDate}`)
    }
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
                  // successfully created user
                  setPass('')
                  setUserId(resp.data.id)
                  setUser(resp.data.username)
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

  const doLogin = (event) => {
    event.preventDefault()
    
    userServices.loginUser({username: user, password: pass})
      .then(resp => {
        setPass('')
        setLoggedIn(true)
        setUserId(resp.data.id)
        setUser(resp.data.username)
        setUpdateConsumed(!updateConsumed)
        const cookies = document.cookie.split(';');
        console.log(cookies)
      })
      .catch(resp => {
        // actually handle it here
        console.log("There was a problem logging in")
      })
  }

  const submitConsumed = (data) => {
    consumedServices.postConsumedEvent({...data, user_id: userId})
      .then(() => toggleUpdateConsumed()) // Not ideal maybe, whole request to get new consumed when we could update the state based on response
  }

  const toggleUpdateConsumed = () => {
    console.log("toggling consumed data, expect to see request sent");
    setUpdateConsumed(!updateConsumed)
  }

  const removeConsumedEntry = (id) => {
    consumedServices.deleteConsumedEvent(id)
        .then(setConsumed(prevCons => prevCons.filter(cons => cons.id != id)))
    // might want to always remove from local list anyway
}

  useEffect(() => {
    if (userId) {
      consumedServices.getAllConsumedByDate(userId, consumedDate)
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
  
  if (!tokenChecked) {
    return (<></>)
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
