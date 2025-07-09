import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export const useAutocomplete = (suggestions: string[], externalValue?: string, onExternalChange?: (value: string) => void) => {
  const [input, setInput] = useState(externalValue || "");
  const [autoStates, setAutoStates] = useState({
    showSuggestions: false,
    isLoading: false,
    noMatch: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const currentValue = externalValue !== undefined ? externalValue : input;

  const filteredSuggestions = currentValue
    ? suggestions.filter(
        (item) => item.toLowerCase().includes(currentValue.toLowerCase()) && currentValue
      )
    : suggestions;

  useEffect(() => {
    if (externalValue !== undefined) {
      setInput(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    if (currentValue) {
      const timer = setTimeout(() => {
        setAutoStates((prev) => ({
          ...prev,
          noMatch: filteredSuggestions.length === 0,
        }));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAutoStates((prev) => ({ ...prev, noMatch: false }));
    }
    // eslint-disable-next-line
  }, [filteredSuggestions.length, currentValue.length]);

  const onHandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (!autoStates.showSuggestions) {
        setAutoStates((prev) => ({ ...prev, showSuggestions: true }));
      } else {
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredSuggestions.length - 1)
        );
      }
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedValue = filteredSuggestions[selectedIndex];
      setInput(selectedValue);
      onExternalChange?.(selectedValue);
      setAutoStates((prev) => ({ ...prev, showSuggestions: false }));
    } else if (e.key === "Escape") {
      setAutoStates((prev) => ({ ...prev, showSuggestions: false }));
    }
  };

  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onExternalChange?.(value);
    setSelectedIndex(-1);
    setAutoStates({ noMatch: false, isLoading: true, showSuggestions: false });
    setTimeout(() => {
      setAutoStates((prev) => ({
        ...prev,
        isLoading: false,
        showSuggestions: true,
      }));
    }, 300);
  };

  const onHandleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    if (onExternalChange) {
      onExternalChange(suggestion);
    }
    setAutoStates((prev) => ({ ...prev, showSuggestions: false }));
  };

  const onHandleBlur = () => {
    setTimeout(() => {
      setAutoStates((prev) => ({ ...prev, showSuggestions: false }));
    }, 100);
  };

  const onClearInput = () => {
    setInput("");
    onExternalChange?.("");
  };

  return {
    input: currentValue,
    autoStates,
    selectedIndex,
    filteredSuggestions,
    onHandleKeyDown,
    onHandleInputChange,
    onHandleSuggestionClick,
    onHandleBlur,
    onClearInput,
  };
};
