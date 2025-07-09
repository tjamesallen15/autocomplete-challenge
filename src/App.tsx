import "./App.css";
import Autocomplete from "./components/Autocomplete";
import AutocompleteForm from "./components/AutocompleteForm";

function App() {
  const source = ["Swift", "C++", "JavaScript", "Java", "Python"];
  return (
    <div className="container">
      <Autocomplete source={source} />
      <AutocompleteForm />
    </div>
  );
}

export default App;
