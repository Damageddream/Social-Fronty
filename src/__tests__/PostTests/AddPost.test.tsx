import AddPost from "../../components/Post/AddPost";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockProps = {
  onAddedPost: vi.fn(),
};

const response = {
  sucess: true,
};

const initial = { ...initialState };
initial.modal.showPost = true;

const server = setupServer(
  http.post("path/post.com", () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => {
  // Start server
  server.listen({ onUnhandledRequest: "error" });
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("testing AddPost component", () => {
  it("testing if all detials renders correctly"),
    () => {
      renderWithProviders(<AddPost {...mockProps} />, {
        preloadedState: initialState,
      });
      const exitBtn = screen.getByText("X");
      const imageInput = screen.getByLabelText(/add image/i);
      const tetInput = screen.getByLabelText(/text:/i);
      const addPostBtn = screen.getByRole("button", { name: "Add post" });

      expect(exitBtn).toBeInTheDocument();
      expect(imageInput).toBeInTheDocument();
      expect(tetInput).toBeInTheDocument();
      expect(addPostBtn).toBeInTheDocument();
    },
    it("testing if subbmitng add post form works", async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddPost {...mockProps} />, {
        preloadedState: initial,
      });

      const file = new File(["test file"], "text.txt", {
        type: "text/plain",
      });

      const imageInput = screen.getByLabelText(/add image/i);
      const tetInput = screen.getByLabelText(/text:/i);
      const addPostBtn = screen.getByText('Add post')

      await user.type(tetInput, "added post");
      await user.upload(imageInput, file);
      await user.click(addPostBtn);
      expect(addPostBtn).toHaveTextContent("")
    });
});
