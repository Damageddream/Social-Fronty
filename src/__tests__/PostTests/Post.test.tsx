import Post from "../../components/Post/Post";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { serverUrl } from "../../utilities/URLs";
import { describe } from "vitest";


const mockProps = {
    postId: "1id"
}
const response = {
    text: "text",
    author: {
        name: "name",
        photo: "path/photo",
        _id: "authorId1",
        friends: ["friends"],
        invites: ["invite1", "invite2"],
        invitesSent: ["inviteSent1", "inviteSent2"]
    },
    timestamp: "01.01.1900",
    likes: ['1','2'],
    _id: 1,
    comments: {
        text: "textComment",
        author: {
            name: "nameCom",
            photo: "path/photo/com",
            _id: "authorId1Com",
            friends: ["friendsCom"],
            invites: ["invite1Com", "invite2Com"],
            invitesSent: ["inviteSent1Com", "inviteSent2Com"]
        },
        timestam: "02.02.1800",
        likes: ['2com', '3com'],
        _id:2,
        post: "post1"
    }
  }



const server = setupServer(http.post('path/post.com', () => {
    return HttpResponse.json(response)}))

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());


describe("tests for Post component", ()=> {
    it("checking if all details render correctly", ()=> {
        renderWithProviders(<Post {...mockProps} />,{preloadedState: initialState}
        )
     const postAuthorName = screen.getByText(/name/i)
     expect(postAuthorName).toBeInTheDocument()
   
    })
})