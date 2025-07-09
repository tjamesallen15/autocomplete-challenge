import { useForm, Controller } from "react-hook-form";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { IoClose, IoSearch } from "react-icons/io5";

interface FormData {
  language: string;
  email: string;
}

interface AutoFormProps {
  source: string[];
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const AutocompleteInput = ({
  source,
  value,
  onChange,
  onBlur,
}: AutoFormProps) => {
  const suggestions = source;
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
  } = useAutocomplete(suggestions, value, onChange);

  const handleBlur = () => {
    onHandleBlur();
    onBlur();
  };

  return (
    <div className="field">
      <input
        className="autocomplete"
        type="text"
        value={input || ""}
        onKeyDown={onHandleKeyDown}
        onChange={onHandleInputChange}
        onBlur={handleBlur}
        placeholder="Select a language..."
      />
      {input && (
        <button type="button" className="dismissible" onClick={onClearInput}>
          <IoClose />
        </button>
      )}
      <span className="search-icon">
        <IoSearch />
      </span>
      {autoStates.showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="autocomplete-suggestion-container">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              className={`autocomplete-suggestion ${
                index === selectedIndex ? "selected" : ""
              }`}
              key={suggestion}
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

const AutocompleteForm = () => {
  const source = ["Swift", "C++", "JavaScript", "Java", "Python"];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="field">
        <label>Programming Language:</label>
        <Controller
          name="language"
          control={control}
          rules={{ required: "Please select a language" }}
          render={({ field }) => (
            <AutocompleteInput source={source} {...field} />
          )}
        />
        {errors.language && <span>{errors.language.message}</span>}
      </div>

      <div className="field">
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
          render={({ field }) => (
            <input type="email" {...field} placeholder="Enter your email" />
          )}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className="field">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AutocompleteForm;
