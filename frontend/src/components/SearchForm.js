
import Results from './Results'

const SearchForm = ({value, onChange, onSubmit, results}) => (
    <div className="Search">
        <h3>Search for a food item:</h3>
        <form onSubmit={onSubmit}>
            <input value={value} onChange = {onChange}/>
            <button type ="submit">Search</button>
        </form>
        <Results results = {[]} />
    </div>
)

export default SearchForm;