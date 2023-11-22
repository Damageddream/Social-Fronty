import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentOptions from "../../components/Comment/CommentOptions";
import { renderWithProviders } from "../../utilities/utilsForTest";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";




const response = {
  sucess: true,
  message: "success",
};

vi.mock("../../customHooks/useOutsideClick.tsx", () => ({
  default: vi.fn(),
}));

const restHandlers = [
  http.delete("https://rest-endpoint.example/path/to/comment", () => {
    return HttpResponse.json(response);
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

const mockProps = {
  authorId: "id1",
  commentId: "id2",
  toggleShowEditComment: vi.fn(),
};

const initialState = {
  user: {
    loggedIn: true,
    name: "",
    photo: "",
    _id: "id1",
    friends: [],
    invites: [],
    invitesSent: [],
    friendsS: [],
  },
  ui: {
    loading: false,
    error: {
      errorStatus: false,
      errorInfo: "",
    },
  },
  modal: {
    showPost: false,
    showUser: false,
  },
  edit: {
    editedComment: 0,
    editedPost: 0,
    editProfile: 0,
  },
  delete: {
    deleteComment: 0,
    deletedPost: 0,
    deleteProfile: 0,
  },
};

describe("CommentOptions component", () => {
  it("renders comment options detials", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentOptions {...mockProps} />, {
      preloadedState: initialState,
    });

    const dots = screen.getAllByAltText("three dots");
    expect(dots[0]).toBeInTheDocument();

    await user.click(dots[0]);
    const editBtn = screen.getByRole("button", { name: "Edit" });
    const deleteBtn = screen.getByRole("button", { name: "Delete" });

    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  
  }),
    it("fetches deleting comment request", async () => {
      const user = userEvent.setup();
      renderWithProviders(<CommentOptions {...mockProps} />, {
        preloadedState: initialState,
      });
      const dots = screen.getAllByAltText("three dots");
      await user.click(dots[0]);

      const deleteBtn = screen.getByRole("button", { name: "Delete" });
      expect(deleteBtn).toBeInTheDocument();
      await user.click(deleteBtn)
      const deleteBtn2 = screen.queryByRole("button", { name: "Delete" });
      expect(deleteBtn2).not.toBeInTheDocument()
    });
});
