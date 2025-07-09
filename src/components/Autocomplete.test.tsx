import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "./Autocomplete";

describe("Autocomplete", () => {
  const source = ["Swift", "C++", "JavaScript", "Java", "Python"];
  test("renders input field", () => {
    render(<Autocomplete source={source} />);
    expect(
      screen.getByPlaceholderText("Type to search...")
    ).toBeInTheDocument();
  });

  test("shows suggestions when typing", async () => {
    render(<Autocomplete source={source} />);
    const input = screen.getByPlaceholderText("Type to search...");

    await userEvent.type(input, "Java");

    await waitFor(() => {
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Java")).toBeInTheDocument();
    });
  });

  test("filters suggestions correctly", async () => {
    render(<Autocomplete source={source} />);
    const input = screen.getByPlaceholderText("Type to search...");

    await userEvent.type(input, "Py");

    await waitFor(() => {
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.queryByText("Java")).not.toBeInTheDocument();
    });
  });

  test("selects suggestion on click", async () => {
    render(<Autocomplete source={source} />);
    const input = screen.getByPlaceholderText("Type to search...");

    await userEvent.type(input, "Java");
    await waitFor(() => screen.getByText("JavaScript"));

    fireEvent.click(screen.getByText("JavaScript"));

    expect(input).toHaveValue("JavaScript");
  });

  test("navigates with arrow keys", async () => {
    render(<Autocomplete source={source} />);
    const input = screen.getByPlaceholderText("Type to search...");

    await userEvent.type(input, "J");
    await waitFor(() => screen.getByText("JavaScript"));

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).toHaveValue("JavaScript");
  });

  test("shows no match message", async () => {
    render(<Autocomplete source={source} />);
    const input = screen.getByPlaceholderText("Type to search...");

    await userEvent.type(input, "xyz");

    await waitFor(() => {
      expect(screen.getByText("No result match 'xyz'.")).toBeInTheDocument();
    });
  });

  test("clears input when clear button clicked", async () => {
    render(<Autocomplete source={source} />);
    const input = screen.getByPlaceholderText("Type to search...");

    await userEvent.type(input, "test");
    fireEvent.click(screen.getByRole("button"));

    expect(input).toHaveValue("");
  });
});
