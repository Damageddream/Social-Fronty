import WallNav from "../../components/Wall/WallNav";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";


const mockProps = {
    setNav: vi.fn(),
}

describe("test for WallNav component", () => {
    it("renders all detail correctly", () => {
        renderWithProviders(<WallNav {...mockProps} />, {
            preloadedState: initialState,
        });
        const searchFriends = screen.getByText("Search for friend");
        const addFriends = screen.getByText("Add new friends");
        const friends = screen.getByText("Your friends");
        const wall = screen.getByText("Your circle");
        expect(friends).toBeInTheDocument();
        expect(searchFriends).toBeInTheDocument();
        expect(addFriends).toBeInTheDocument();
        expect(wall).toBeInTheDocument();
    }),
        it("should set nav correctly", async () => {
            const user = userEvent.setup();
            renderWithProviders(<WallNav {...mockProps} />, {
                preloadedState: initialState,
            });
            const searchFriends = screen.getByText("Search for friend");
            const addFriends = screen.getByText("Add new friends");
            const friends = screen.getByText("Your friends");
            const wall = screen.getByText("Your circle");
            await user.click(searchFriends);
            await waitFor(() => {
                expect(mockProps.setNav).toHaveBeenCalled();
            });
            await user.click(friends);
            await waitFor(() => {
                expect(mockProps.setNav).toHaveBeenCalled();
            });
            await user.click(addFriends);
            await waitFor(() => {
                expect(mockProps.setNav).toHaveBeenCalled();
            });
            await user.click(wall);
            await waitFor(() => {
                expect(mockProps.setNav).toHaveBeenCalled();
            });
        });
})