import LogIn from "../LoginPage";
import { renderWithProviders } from "./../utilities/utilsForTest";
import { screen, waitFor } from "@testing-library/react";
import initialState from "./testUtilities/initialState";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("../../components/LoginAndRegister/Login.tsx", () => {
  return {
    default: () => {
      return <div data-testid="login" />;
    },
  };
});

vi.mock("../../components/LoginAndRegister/RegisterUser.tsx", () => {
  return {
    default: () => {
      return <div data-testid="register" />;
    },
  };
});

vi.mock("../../components/LoginAndRegister/GuestLogin.tsx", () => {
  return {
    default: () => {
      return <div data-testid="guest" />;
    },
  };
});

describe("test for login page component", () => {
  it("testing if all detials renders correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
      {
        preloadedState: initialState,
      }
    );
    const loginComponent = screen.queryByTestId("login");
    const registerComponent = screen.queryByTestId("register");
    const guestComponent = screen.getByText("Visit as guest");
    const header = screen.getByRole("heading", { name: "Log in to your account" });
    const register = screen.getByText(/Don't have an account/i);
    const facebookLoginBtn = screen.getByRole("button", { name: "Log in with facebook" });
    const logInBtn = screen.getByRole("button", { name: "Log In" });
    expect(loginComponent).not.toBeInTheDocument();
    expect(registerComponent).not.toBeInTheDocument();
    expect(guestComponent).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(facebookLoginBtn).toBeInTheDocument();
    expect(logInBtn).toBeInTheDocument();
  }),
  it("testing if guest login component works correctly", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
      {
        preloadedState: initialState,
      }
    );
    const guestComponent = screen.getByText("Visit as guest");
    await user.click(guestComponent);
    expect(guestComponent).toHaveTextContent("");

    const logInBtn = screen.getByRole("button", { name: "Log In" });
    await user.click(logInBtn);
    await waitFor(() => {
      const username = screen.getByLabelText("Username");
      expect(username).toBeInTheDocument();
    });
  }),
  it("testing if register link works correctly", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
      {
        preloadedState: initialState,
      }
    );
    const register = screen.getByText(/Don't have an account/i);
    await user.click(register);
    await waitFor(() => {
      const profilePhoto = screen.getByLabelText("Choose profile photo");
      expect(profilePhoto).toBeInTheDocument();
    });
  })
});
