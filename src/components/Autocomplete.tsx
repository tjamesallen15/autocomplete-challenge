import { IoClose, IoSearch } from "react-icons/io5";
import { useAutocomplete } from "../hooks/useAutocomplete";

const Autocomplete = () => {
  const suggestions = ["Swift", "C++", "JavaScript", "Java", "Python"];
  const {
    input,
    autoStates,
    selectedIndex,
    filteredSuggestions,
    onHandleKeyDown,
    onHandleInputChange,
    onHandleSuggestionClick,
    onHandleBlur,
    onClearInput,
  } = useAutocomplete(suggestions);

  return (
    <div className="field">
      <label htmlFor="autocomplete-input">Autocomplete</label>
      <input
        id="autocomplete-input"
        className="autocomplete"
        type="text"
        value={input}
        onKeyDown={onHandleKeyDown}
        onChange={(e) => onHandleInputChange(e)}
        onBlur={onHandleBlur}
        placeholder="Type to search..."
        role="combobox"
        aria-controls="suggestions-list"
        aria-expanded={autoStates.showSuggestions}
        aria-haspopup="listbox"
        aria-activedescendant={
          selectedIndex >= 0 ? `option-${selectedIndex}` : undefined
        }
      />
      {input && (
        <button type="button" className="dismissible" onClick={onClearInput}>
          <IoClose />
        </button>
      )}
      <span className="search-icon">
        <IoSearch />
      </span>
      {autoStates.isLoading && input && (
        <div className="autocomplete-suggestion-container">
          <div className="autocomplete-suggestion loading">Loading...</div>
        </div>
      )}
      {autoStates.noMatch && input && (
        <div className="autocomplete-suggestion-container">
          <div className="autocomplete-suggestion no-match">
            No result match '{input}'.
          </div>
        </div>
      )}
      {autoStates.showSuggestions && filteredSuggestions.length > 0 && (
        <ul id="suggestions-list" className="autocomplete-suggestion-container">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              className={`autocomplete-suggestion ${
                index === selectedIndex ? "selected" : ""
              }`}
              key={index}
              onClick={() => onHandleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
