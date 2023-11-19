import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentOptions from "../../components/Comment/CommentOptions";
import { renderWithProviders } from "../../utilities/utilsForTest";


vi.mock('../../customHooks/useOutsideClick.tsx',() => ({
  default: vi.fn(),
}) )


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
  it("renders comment options detials", () => {

    const toggleShowEditCommentSpy = vi.spyOn(mockProps, "toggleShowEditComment")

    
    renderWithProviders(
        <CommentOptions {...mockProps} />, {
          preloadedState: initialState
        }
    );

    const dots = screen.getAllByAltText("three dots");
    console.log("Dots:", dots);

    expect(dots[0]).toBeInTheDocument();
  });
});
