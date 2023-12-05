import LogInNoFacebook from "../../components/LoginAndRegister/Login";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";

const mockProps = {
  backToDefault: vi.fn(),
};

const response = {
  sucess: true,
};

const server = setupServer(
  http.put("https://rest-endpoint.example/path/to/comment", () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("tests for Login component", () => {
  it("checking if all details renders corretcly", () => {
    renderWithProviders(<LogInNoFacebook {...mockProps} />, {
      preloadedState: initialState,
    });
    const loginInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const backButton = screen.getByRole("button", { name: "back" });

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  }),
    it("checing if can login", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LogInNoFacebook {...mockProps} />, {
        preloadedState: initialState,
      });
      const loginInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const backButton = screen.getByRole("button", { name: "back" });

      await user.type(loginInput, "login");
      await user.type(passwordInput, "password");
      await user.click(backButton);

      expect(backButton).not.toBeInTheDocument();
    });
});
