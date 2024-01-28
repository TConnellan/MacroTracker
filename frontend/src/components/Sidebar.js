


// pass to the component the things we want in the sidebar
// also pass in a single handle function
// for each button in the side bar
const Sidebar = ({buttonLabels, fetchConsumed}) => {
    return ( <div id="Sidebar">
        {buttonLabels.map(name => <div><button className="Sidebar-button" onClick={fetchConsumed}>{name}</button></div>)}
    </div> )
}




export default Sidebar;