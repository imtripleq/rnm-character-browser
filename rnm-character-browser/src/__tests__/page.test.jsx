import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /dennis' demo/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Home />);

    const description = screen.getByText(
      /explore and discover characters from the rick and morty universe/i
    );

    expect(description).toBeInTheDocument();
  });

  it("renders the Get Started link", () => {
    render(<Home />);

    const link = screen.getByRole("link", {
      name: /get started/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/listing/1");
  });
});
