import MyFriends from "../../components/Wall/MyFriends";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

const response = {
  loggedIn: true,
  name: "John Doe",
  photo: "path/to/photo1",
  id: "1",
  friends: [
    {
      name: "John Doe",
      photo: "path/to/photo1",
      _id: "1",
      friends: [],
      invites: [],
      invitesSent: [],
    },
    {
      name: "John Doe",
      photo: "path/to/photo1",
      _id: "2",
      friends: [],
      invites: [],
      invitesSent: [],
    },
  ],
  invites: [],
  invitesSent: [],
};

const server = setupServer(
  http.get(`/users/friends`, () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => {
  // Start server
  server.listen({ onUnhandledRequest: "error" });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("test for MyFriends component", () => {
  it("renders all detail correctly", async () => {
    renderWithProviders(<MyFriends />, {
      preloadedState: initialState,
    });
    const friends = await screen.findAllByText("John Doe");
    expect(friends.length).toBe(2);
  });
});
