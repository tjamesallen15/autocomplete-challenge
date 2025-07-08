import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutocompleteForm from "./AutocompleteForm";

describe("AutocompleteForm", () => {
  test("validates required fields", async () => {
    render(<AutocompleteForm />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Please select a language")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  test("submits form with autocomplete selection", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<AutocompleteForm />);

    const languageInput = screen.getByPlaceholderText("Select a language...");
    const emailInput = screen.getByPlaceholderText("Enter your email");

    await userEvent.type(languageInput, "Java");
    
    await waitFor(() => {
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });
    
    await userEvent.click(screen.getByText("JavaScript"));
    await userEvent.type(emailInput, "test@example.com");

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
        language: "JavaScript",
        email: "test@example.com",
      });
    });

    consoleSpy.mockRestore();
  });

  test("validates email format", async () => {
    render(<AutocompleteForm />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    await userEvent.type(emailInput, "invalid-email");

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });
});
