


// pass to the component the things we want in the sidebar
// also pass in a single handle function
// for each button in the side bar
const Sidebar = ({buttonLabels, isLoggedIn, todaysMacrosClick}) => {
    if (isLoggedIn) {
        return <div id="Sidebar">
            {buttonLabels.map(name => <div><button className="Sidebar-button" onClick={todaysMacrosClick}>{name}</button></div>)}
        </div>
    } else {
        return <></>
    }


}




export default Sidebar;