import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecruiterProfileDeck } from "@/components/sections/recruiter/RecruiterProfileDeck";

describe("RecruiterProfileDeck", () => {
  it("renders the recruiter sections derived from the legacy site", () => {
    render(<RecruiterProfileDeck />);

    expect(screen.getByRole("heading", { name: "My CV" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Key Achievements" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech Stack" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Corporate Projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Private Projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email/i })).toHaveAttribute("href", "mailto:ubterzioglu@gmail.com");
  });
});
