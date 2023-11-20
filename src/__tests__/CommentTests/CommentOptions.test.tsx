import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentOptions from "../../components/Comment/CommentOptions";
import { renderWithProviders } from "../../utilities/utilsForTest";
import userEvent from "@testing-library/user-event";

interface JsonResolve {
  sucess: boolean;
  message: string;
}

vi.mock('../../customHooks/useOutsideClick.tsx',() => ({
  default: vi.fn(),
}) )

global.fetch = vi.fn()

function createFetchResponse(data:JsonResolve) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}


const mockProps = {
  authorId: "id1",
  commentId: "id2",
  toggleShowEditComment: vi.fn(),
};

const initialState = { user: {
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
},}

describe("CommentOptions component", () => {
  it("renders comment options detials", async () => {
    const user =  userEvent.setup()
    renderWithProviders(
        <CommentOptions {...mockProps} />, {
          preloadedState: initialState
        }
    );

    const dots = screen.getAllByAltText("three dots");
    expect(dots[0]).toBeInTheDocument();

    await user.click(dots[0])
    const editBtn = screen.getByRole('button', {name: "Edit"})
    const deleteBtn = screen.getByRole('button', {name: "Delete"})

    expect(editBtn).toBeInTheDocument()
    expect(deleteBtn).toBeInTheDocument()
    expect(deleteBtn.firstChild)

  }),
  it("fetches deleting comment request", () => {
    const token = "token"
    const response = {
      sucess: true,
      message: "deleted comment"
    }
 
  })
});
