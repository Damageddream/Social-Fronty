import InviteSingle from "../../components/Wall/InviteSingle";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

const mockProps = {
    id: "1",
    name: "John Doe",
    photo: "path/to/photo1",
    onResponseAction: vi.fn(),
};

const response = {
    success: true,
    message: "Invite sent",
};

const server = setupServer(
    http.post(`/users/invite`, () => {
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

describe("test for InviteSingle component", () => {
    it("renders all detail correctly", () => {
        renderWithProviders(<InviteSingle {...mockProps} />, {
            preloadedState: initialState,
        });
        const invite = screen.getByText("User John Doe invited you to be friends")
        const photo = screen.getByAltText("profile picture");
        const hiddenInput = screen.getByTestId("hidden-input");
        const acceptBtn = screen.getByRole("button", { name: "Accept" });
        const declineBtn = screen.getByRole("button", { name: "Decline" });
        expect(invite).toBeInTheDocument();
        expect(photo).toBeInTheDocument();
        expect(hiddenInput).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
        expect(declineBtn).toBeInTheDocument();
        
    })
    // ,
    // it("should accept invite correctly", async () => {
    //     const user = userEvent.setup();
    //     renderWithProviders(<InviteSingle {...mockProps} />, {
    //         preloadedState: initialState,
    //     });
    //     const acceptBtn = screen.getByRole("button", { name: "Accept" });
    //     const declineBtn = screen.getByRole("button", { name: "Decline" });
    //     const form = screen.getByTestId("hidden-input");
        
    //     await waitFor(async () => {await user.click(acceptBtn)
    //     const form = screen.getByTestId("hidden-input");
    //     })


    // });
});