/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import Login from "@/app/(guest)/(auth)/login/page";

describe("Login Page", () => {
  it("renders correctly", () => {
    render(<Login />);
    const headings = screen.getAllByText("Log In");
    console.log(headings);
    expect(headings).toHaveLength(2);
  });
});
