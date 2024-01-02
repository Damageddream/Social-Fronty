import AddNewSingle from "../../components/Wall/AddNewSingle";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import initialState from "../testUtilities/initialState";

const mockProps = {
    stranger: {
        name: "John Doe",
        photo: "path/to/photo1",
        _id: "1",
        friends: [],
        invites: [],
        invitesSent: [],
    },
    submitHandler: vi.fn(),
    loading: false,
    };      
describe("AddNewSingle", () => {
    it("renders all detail correctly", () => {
        renderWithProviders(<AddNewSingle {...mockProps} />,{preloadedState:initialState} );
        const photo = screen.getByAltText("profile picture");
        const name = screen.getByText("John Doe");
        const button = screen.getByRole("button", { name: "Invite to friends" });
        const hiddenInput = screen.getByTestId("hidden-input");
        expect(photo).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(hiddenInput).toBeInTheDocument();
    }),
    it("sends invite to friends", async () => {
        const user = userEvent.setup()
        renderWithProviders(<AddNewSingle {...mockProps} />,{preloadedState:initialState} );
        const button = screen.getByRole("button", { name: "Invite to friends" });
        await user.click(button);
        expect(mockProps.submitHandler).toHaveBeenCalled();
    })

});