# Autocomplete Component

A React TypeScript autocomplete component with keyboard navigation, form integration, and comprehensive testing.

## Design Decisions

### Component Architecture

- **Custom Hook Pattern**: `useAutocomplete` encapsulates all logic, making it reusable and testable
- **Controlled/Uncontrolled Support**: Hook accepts external value control for form libraries while maintaining internal state for standalone use
- **Separation of Concerns**: UI rendering separated from business logic

### API Design

```tsx
// Standalone usage
const { input, autoStates, selectedIndex, filteredSuggestions, handlers } =
  useAutocomplete(suggestions);

// Form integration
const { input, autoStates, selectedIndex, filteredSuggestions, handlers } =
  useAutocomplete(suggestions, externalValue, onExternalChange);
```

### State Management

- **Consolidated State**: Combined UI states (`showSuggestions`, `isLoading`, `noMatch`) into single object to reduce re-renders
- **Debounced Loading**: 300ms delay for loading state to prevent flickering
- **Keyboard Navigation**: Arrow keys, Enter, and Escape support with proper index management

### Form Integration

- **React Hook Form Compatible**: Uses Controller pattern with field props (`value`, `onChange`, `onBlur`)
- **Validation Support**: Integrates with form validation rules and error handling
- **External Control**: Hook prioritizes external value when provided, falls back to internal state

### Accessibility

- **ARIA Attributes**: `role="combobox"`, `aria-expanded`, `aria-haspopup`, `aria-activedescendant`
- **Keyboard Navigation**: Full keyboard support for screen readers
- **Focus Management**: Proper blur handling with timeout to allow suggestion clicks

### Testing Strategy

- **Component Tests**: User interactions, keyboard navigation, suggestion filtering
- **Form Integration Tests**: Validation, submission, external control
- **Hook Tests**: Logic isolation and reusability verification

## Project Structure

```
src/
├── components/
│   ├── Autocomplete.tsx          # Standalone component
│   ├── Autocomplete.test.tsx     # Component tests
│   ├── AutocompleteForm.tsx      # Form integration example
│   └── AutocompleteForm.test.tsx # Form tests
├── hooks/
│   └── useAutocomplete.ts        # Custom hook with logic
└── App.tsx                       # Demo application
```

## Running the Project

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the component demo.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Build

```bash
npm run build
```

## Usage Examples

### Standalone Component

```tsx
import Autocomplete from "./components/Autocomplete";

function App() {
  return <Autocomplete />;
}
```

### With React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";
import { useAutocomplete } from "./hooks/useAutocomplete";

const MyForm = () => {
  const { control } = useForm();

  return (
    <Controller
      name="language"
      control={control}
      render={({ field }) => <AutocompleteInput {...field} />}
    />
  );
};
```

### Custom Hook Usage

```tsx
const MyComponent = () => {
  const suggestions = ["Option 1", "Option 2"];
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

  // Custom UI implementation
};
```
