import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentCard from "../../components/Comment/CommentCard";

vi.mock("../../customHooks/useToggle", () => ({
  default: vi.fn(() => [false, vi.fn()]),
}));

vi.mock("../../components/Comment/CommentOptions", () => {
  return {
    default: () => {
      return <div data-testid="commentOptions" />;
    },
  };
});

vi.mock("../../components/Comment/EditComment", () => {
  return {
    default: () => {
      return <div data-testid="commentEdit" />;
    },
  };
});

const newLikeAddedMock = vi.fn();

const comment = {
  _id: 123,
  author: {
    _id: "authorId",
    name: "Author Name",
    photo: "path/photo",
    friends: [],
    invites: [],
    invitesSent: [],
  },
  text: "comment text",
  likes: [],
  timestamp: "00:00",
  post: "postId",
};

it("renders child components", () => {
  render(<CommentCard comment={comment} newLikeAdded={newLikeAddedMock} />);

  const editComment = screen.queryByTestId("commentEdit");

  expect(editComment).not.toBeInTheDocument();
});
