import GuestLogin from "../../components/LoginAndRegister/GuestLogin";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

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

describe("tests for guestLogin component", () => {
  it("checking if all details render correctly and can login", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <GuestLogin />
      </BrowserRouter>,
      { preloadedState: initialState }
    );
    const loginGuestBtn = screen.getByRole("button", {
      name: "Visit as guest",
    });
    expect(loginGuestBtn).toBeInTheDocument();
    await user.click(loginGuestBtn)
    expect(loginGuestBtn).toHaveTextContent("")
  });
}); 


