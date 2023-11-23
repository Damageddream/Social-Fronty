import AddComment from "../../components/Comment/AddComment";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { serverUrl } from "../../utilities/URLs";
import 'isomorphic-fetch'

const mockProps = {
    postID: "id1",
    handleAddComment: vi.fn()
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

describe("Add Comment component", () => {
    it("render AddComment component details", async () => {
        const user = userEvent.setup()
        renderWithProviders(<AddComment {...mockProps} />, {
            preloadedState: initialState,
        })

    const addCommentBtn = screen.getByText("Add comment")
    expect(addCommentBtn).toBeInTheDocument()
    await user.click(addCommentBtn)
    const x = screen.getByText('X')
    const comment = screen.getByText(/Comment:/i)
    const submitCommentBtn = screen.getByRole('button', {name: "Submit comment"})
    expect(x).toBeInTheDocument()
    expect(comment).toBeInTheDocument()
    expect(submitCommentBtn).toBeInTheDocument()

    })
    it("test form submission", async ()=>{
        const user = userEvent.setup()
        renderWithProviders(<AddComment {...mockProps} />, {
            preloadedState: initialState,
        })
        console.log(screen.debug());
        const addCommentBtn = screen.getByText("Add comment")
        expect(addCommentBtn).toBeInTheDocument()
        await user.click(addCommentBtn)
        const submitCommentBtn = screen.getByRole('button', {name: "Submit comment"})
        expect(submitCommentBtn).toBeInTheDocument()

        const textInput = screen.getByLabelText('Comment:')
        await user.type(textInput, "test comment")
        
        expect(textInput).toHaveValue("test comment")

        await user.click(submitCommentBtn)

        expect(submitCommentBtn).not.toBeInTheDocument()

    })
})

