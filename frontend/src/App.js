import Header from './components/Header';
import bread from './bread_logo_transparent.png';
import Auth from './components/Auth'
import consumedServices from './services/consumed'
import userServices from './services/user'
import './App.css';
import {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar';
import Display from './components/Display';

import { setUser } from './reducers/userReducer'
import { setConsumedDate, setConsumed, emptyConsumed, removeFromConsumed } from './reducers/consumedReducer'
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [pass, setPass] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [tokenChecked, setTokenChecked] = useState(false)
  // const [consumed, setConsumed] = useState([])
  const [updateConsumed, setUpdateConsumed] = useState(false)
  const [sidebarChoice, setSidebarChoice] = useState("Macros")


  const dispatch = useDispatch()
  const user = useSelector(state => state.user.username)
  const consumedDate = useSelector(state => state.consumed.consumedDate)
  // const consumed = useSelector(state => state.consumed.consumed)

  useEffect(() => {
    userServices.verifyLoggedIn()
                .then(resp => {
                  if (resp.status === 200) {
                    setPass('')
                    dispatch(setUser(resp.data.username))
                    setLoggedIn(true)
                    const today = Date()
                    dispatch(setConsumedDate(today))
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

  // useEffect(() => {
  //   const today = Date()
  //   dispatch(setConsumedDate(today))
  // }, [])
  
  useEffect(() => {
    if (consumedDate.toString() != '') {
      console.log(`Set todays date: ${consumedDate}`)
    }
  }, [consumedDate])

  const handleUser = (event) => {
    event.preventDefault()
    dispatch(setUser(event.target.value))
  }
  
  const handlePass = (event) => {
    event.preventDefault()
    setPass(event.target.value)
  }

  const createUser = (event) => {
    event.preventDefault()
    userServices.postNewUser({username: user, password: pass})
                .then(resp => {
                  // successfully created user
                  setPass('')
                  dispatch(setUser(resp.data.username))
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
        dispatch(setUser(resp.data.username))
        const today = Date()
        dispatch(setConsumedDate(today))
        setUpdateConsumed(!updateConsumed)
      })
      .catch(resp => {
        // actually handle it here
        console.log("There was a problem logging in")
      })
  }

  const submitConsumed = (data) => {
    consumedServices.postConsumedEvent({...data})
      .then(() => toggleUpdateConsumed()) 
      // Not ideal maybe, whole request to get new consumed when we could update the state based on response
      // TODO: modify backend to return the created event with the response, then use addToConsumed action
  }

  const toggleUpdateConsumed = () => {
    console.log("toggling consumed data, expect to see request sent");
    setUpdateConsumed(!updateConsumed)
  }

  const removeConsumedEntry = (id) => {
    consumedServices.deleteConsumedEvent(id)
        .then(dispatch(removeFromConsumed(id)))
    // might want to always remove from local list anyway
  }

  useEffect(() => {
    consumedServices.getAllConsumedByDate(consumedDate)
      .then(initialData => {
        dispatch(setConsumed(initialData))
      })
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
          <Sidebar id="Sidebar" updateSidebarChoice={updateSidebarChoice}/>
          <Display id="display_remove" sidebarChoice={sidebarChoice} 
                  user={user}
                  createConsumable={consumedServices.postNewConsumable}
                  removeConsumedEntry={removeConsumedEntry}
                  createConsumed={submitConsumed}/>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header logo = {bread}/>
        <Auth handleUser = {handleUser} 
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
