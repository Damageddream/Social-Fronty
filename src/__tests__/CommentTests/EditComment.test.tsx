import { screen } from "@testing-library/react";
import EditComment from "../../components/Comment/EditComment";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";

const mockProps = {
  commentId: "commentId1",
  orginalText: "oryginal text",
  postId: "postId1",
  likes: ["1", "2"],
  toggleShowEditComment: vi.fn(),
};

const response = {
  text: "text",
  author: "authorId1",
  timestamp: new Date(),
  likes: ["1", "2", "3"],
  post: "postId1",
  _id: "commentId1",
};

const server = setupServer(
  http.put("https://rest-endpoint.example/path/to/comment", () => {
    return HttpResponse.json(response);
  })
);


// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("Edit Comment component", () => {
  it("render EditComment component detials", () => {
    renderWithProviders(<EditComment {...mockProps} />, {
      preloadedState: initialState,
    });
    const inputText = screen.getByLabelText("Comment:");
    const xBtn = screen.getByRole("button", { name: "X" });
    const editBtn = screen.getByRole("button", { name: "Edit Comment" });
    expect(inputText).toBeInTheDocument();
    expect(xBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
  }),
    it("test edit form submission", async () => {
      const user = userEvent.setup();
      renderWithProviders(<EditComment {...mockProps} />, {
        preloadedState: initialState,
      });
      const inputText = screen.getByLabelText("Comment:");
      const editBtn = screen.getByRole("button", { name: "Edit Comment" });

      await user.type(inputText, "edit comment");

      expect(inputText).toHaveValue("edit comment");

      await user.click(editBtn);

      expect(editBtn).not.toBeInTheDocument()
    });
});
