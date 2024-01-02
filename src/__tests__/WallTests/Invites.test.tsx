import Invites from "../../components/Wall/Invites";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

vi.mock("../../components/Wall/InviteSingle.tsx", () => {
  return {
    default: () => {
      return <div data-testid="invite" />;
    },
  };
});

const response = {
  success: true,
  invites: [
    {
      name: "John Doe",
      photo: "path/to/photo1",
      _id: "1",
      friends: [],
      invites: [],
      invitesSent: [],
    },
    {
      name: "Jane Doe",
      photo: "path/to/photo2",
      _id: "2",
      friends: [],
      invites: [],
      invitesSent: [],
    },
  ],
};

const server = setupServer(
  http.get(`/users/invites`, () => {
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

describe("test for Invites component", () => {
  it("renders all detail correctly", async () => {
    renderWithProviders(<Invites />, { preloadedState: initialState });
    const heading = screen.getByRole('heading', { name: 'Invites to friends:' });
    expect(heading).toBeInTheDocument();
    await waitFor(() => {
      const invite = screen.getAllByTestId("invite");
      expect(invite.length).toBeGreaterThan(0);
      invite.forEach((invite) => {
        expect(invite).toBeInTheDocument();
      });
    });
  });
});
