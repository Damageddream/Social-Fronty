import EditPost from "../../components/Post/EditPost";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockProps = {
    orginalText: 'text',
    postId: 'post1Id',
    likes: ["1","2"],
    comments: ["comment1", "comment2"]
}

const response = {
    editetPost: true
}

const server = setupServer(
    http.post("path/post.com", () => {
      return HttpResponse.json(response);
    })
  );
  
// Start server before all tests
beforeAll(() => {
    // Start server
    server.listen({ onUnhandledRequest: "error" });
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });
  
  //  Close server after all tests
  afterAll(() => server.close());
  
  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers());

  describe('Testing EditPost component', () => {
    it('check if all detials render correctly', () => {
        renderWithProviders(<EditPost {...mockProps} />, {
            preloadedState: initialState
        })
        
        const exitButton = screen.getByText("X")
        const photoInput = screen.getByLabelText('Add image')
        const textInput = screen.getByLabelText('Text:')
        const submitEditBtn = screen.getByText(/edit post/i)

        expect(exitButton).toBeInTheDocument()
        expect(photoInput).toBeInTheDocument()
        expect(textInput).toBeInTheDocument()
        expect(submitEditBtn).toBeInTheDocument()
    }),
    it('submitting edit post form correctly', async () => {
        const user = userEvent.setup()
        renderWithProviders(<EditPost {...mockProps} />, {
            preloadedState: initialState
        })

        const file = new File(["test file"], "text.txt", {
            type: "text/plain"
        })

        const photoInput = screen.getByLabelText('Add image')
        const textInput = screen.getByLabelText('Text:')
        const submitEditBtn = screen.getByText(/edit post/i)

        await user.type(textInput, "edited post")
        await user.upload(photoInput, file)
        await user.click(submitEditBtn)

        expect(submitEditBtn).toHaveTextContent("")

    })
  })