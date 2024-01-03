import Search from "../../components/Wall/Search";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";

const mockProps = {
  strangers: [
    {
      name: "John Doe",
      photo: "path/to/photo1",
      _id: "1",
      friends: [],
      invites: [],
      invitesSent: [],
    },
    {
      name: "Marry",
      photo: "path/to/photo1",
      _id: "2",
      friends: [],
      invites: [],
      invitesSent: [],
    },
  ],
  updateStrangers: vi.fn(),
};

describe("test for Search component", () => {
  it("renders all detail correctly", () => {
    renderWithProviders(<Search {...mockProps} />, {
      preloadedState: initialState,
    });
    const label = screen.getByText("Search for friends");
    const input = screen.getByLabelText("Search for friends");
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  }),
    it("should update strangers correctly", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Search {...mockProps} />, {
        preloadedState: initialState,
      });
      const input = screen.getByLabelText("Search for friends");
      await user.type(input, "John Doe");
      await waitFor(() => {
        expect(mockProps.updateStrangers).toHaveBeenCalled();
      });
    });
});