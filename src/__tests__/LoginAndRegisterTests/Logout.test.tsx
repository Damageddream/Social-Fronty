import Logout from "../../components/LoginAndRegister/Logout";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";

const response = {
    sucess: true
}

const server = setupServer(
    http.post("path/post.com", () => {
      return HttpResponse.json(response);
    })
  );
  
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  
  //  Close server after all tests
  afterAll(() => server.close());
  
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers());

it("test if logout component renders button and logouts user", async () => {
    const user = userEvent.setup()
    renderWithProviders(<Logout />, {
        preloadedState: initialState
    })
    const logoutBtn = screen.getByRole("button", {name: "logout"})
    expect(logoutBtn).toBeInTheDocument()
    await user.click(logoutBtn)
    expect(logoutBtn).not.toBeInTheDocument()
})