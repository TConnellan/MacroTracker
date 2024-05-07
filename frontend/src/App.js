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
import { setConsumedStartDate, setConsumedEndDate, setConsumed, emptyConsumed, removeFromConsumed } from './reducers/consumedReducer'
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tokenChecked, setTokenChecked] = useState(false)
  const [sidebarChoice, setSidebarChoice] = useState("Macros")

  const dispatch = useDispatch()
  const consumedStartDate = useSelector(state => state.consumed.consumedStartDate)
  const consumedEndDate = useSelector(state => state.consumed.consumedEndDate)


  useEffect(() => {
    userServices.verifyLoggedIn()
                .then(resp => {
                  if (resp.status === 200) {
                    dispatch(setUser(resp.data.username))
                    setLoggedIn(true)
                    var todayStart = new Date(new Date().setUTCHours(0,0,0,0))
                    var todayEnd = new Date(new Date().setUTCHours(23,59,59,999))
                    // console.log(todayStart);
                    // console.log(typeof(todayStart));
                    // todayStart.setUTCHours(0,0,0,0)
                    // todayEnd.setUTCHours(23,59,59,999)
                    dispatch(setConsumedStartDate(todayStart))
                    dispatch(setConsumedEndDate(todayEnd))
                    // updateConsumed()
                  }
                })
                .then(() => {
                  updateConsumed()
                })
                .catch(err => {
                  console.log(err)
                  console.log("There was an issue verifying authorisation")
                })
                .finally(() => {
                  setTokenChecked(true)
                })
    
  }, [])

  useEffect(() => {
    document.title = "MacroTracker"
  }, [])
  
  // useEffect(() => {
  //   if (consumedStartDate.toString() != '') {
  //     console.log(`Set todays date: ${consumedStartDate}`)
  //   }
  // }, [consumedStartDate])

  const submitConsumed = (data) => {
    consumedServices.postConsumedEvent({...data})
      .then(() => updateConsumed()) 
      // Not ideal maybe, whole request to get new consumed when we could update the state based on response
      // TODO: modify backend to return the created event with the response, then use addToConsumed action
  }

  const removeConsumedEntry = (id) => {
    consumedServices.deleteConsumedEvent(id)
        .then(dispatch(removeFromConsumed(id)))
    // might want to always remove from local list anyway
  }

  const updateConsumed = () => {
    consumedServices.getAllConsumedByDate(consumedStartDate, consumedEndDate)
                    .then(initialData => {
                      dispatch(setConsumed(initialData))
                    })
  }

  const updateSidebarChoice = (choice) => {
    setSidebarChoice(choice)
    if (choice == "Macros") {
      updateConsumed()
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
        <Auth setLoggedIn = {setLoggedIn} updateConsumed={updateConsumed} />
      </div>
    )
  }
}

export default App;
