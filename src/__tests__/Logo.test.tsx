import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from "../components/Logo/Logo";



it("renders all of logo component", () => {
  render(<Logo />);

  vi.mock("../components/Logo/Circle", ()=>{
    return {
        default: ()=>{
            return <div data-testid="logoImage">mock image</div>;
        }
    }
});

vi.mock("../components/Logo/LogoText", ()=>{
    return {
        default: ()=>{
            return <div data-testid="logoText">mock text</div>;
        }
    }
});

  const image = screen.getByTestId("logoImage");
  const text = screen.getByTestId("logoText");

  expect(image).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
