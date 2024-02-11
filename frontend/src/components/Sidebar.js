


// pass to the component the things we want in the sidebar
// also pass in a single handle function
// for each button in the side bar
const Sidebar = ({updateMacros, fetchConsumed, updateSidebarChoice}) => {
    return ( 
        <div id="Sidebar">
            <div><button className="Sidebar-button" onClick={() => updateSidebarChoice("Macros")}>{"Macros"}</button></div>
            <div><button className="Sidebar-button" onClick={() => updateSidebarChoice("Recipes")}>{"Recipes"}</button></div>
            <div><button className="Sidebar-button" onClick={() => updateSidebarChoice("Pantry")}>{"Pantry"}</button></div>
    </div> )
}




export default Sidebar;