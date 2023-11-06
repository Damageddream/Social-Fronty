import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Circle from "../components/Logo/Circle";
import LogoText from "../components/Logo/LogoText";

it("renders logo text", () => {
  render(<LogoText />);

  const logoName = screen.getByText(/MY SOCIAL CIRCLE/i);
  const logoBrand = screen.getByText(/WHERE SOCIAL MEETS PERSONAL/i);

  expect(logoBrand).toBeInTheDocument();
  expect(logoName).toBeInTheDocument();
});

it("renders logo image", () => {
  render(<Circle />);

  const circle = screen.getByAltText("purple circle");

  expect(circle).toBeInTheDocument();
});

