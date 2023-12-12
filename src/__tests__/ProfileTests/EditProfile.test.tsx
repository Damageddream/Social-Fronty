import EditProfile from "../../components/Profile/EditProfile";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";

const mockProps = {
    orginalName: "name",
    userId: "1id",
}

const response = {
    sucess: true,
    message: "sucess",
  }



const server = setupServer(http.post(serverUrl + `/posts/${mockProps.postID}/comments`, () => {
    return HttpResponse.json(response)}))

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("test for edit profile component", () => {
    it("checking if all detials renders", () => {
        renderWithProviders(<EditProfile {...mockProps}/>, {
            preloadedState: initialState
        })
    })
})