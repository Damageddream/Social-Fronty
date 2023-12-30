import Post from "../../components/Post/Post";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import { describe } from "vitest";

vi.mock("../../components/Comment/AddComment", () => {
  return {
    default: () => {
      return <div data-testid="addComment" />;
    },
  };
});
vi.mock("../../components/Comment/CommentCard", () => {
  return {
    default: () => {
      return <div data-testid="commentCard" />;
    },
  };
});
vi.mock("../../components/Post/PostOptions", () => {
  return {
    default: () => {
      return <div data-testid="postOptions" />;
    },
  };
});

const mockProps = {
  postId: "1",
};
const response = {
  text: "text",
  photo: "path/photo2",
  author: {
    name: "name",
    photo: "path/photo",
    _id: "authorId1",
    friends: ["friends"],
    invites: ["invite1", "invite2"],
    invitesSent: ["inviteSent1", "inviteSent2"],
  },
  timestamp: "01.01.1900",
  likes: ["1", "2"],
  _id: 1,
  comments: [{
    text: "textComment",
    author: {
      name: "nameCom",
      photo: "path/photo/com",
      _id: "authorId1Com",
      friends: ["friendsCom"],
      invites: ["invite1Com", "invite2Com"],
      invitesSent: ["inviteSent1Com", "inviteSent2Com"],
    },
    timestam: "02.02.1800",
    likes: ["2com", "3com"],
    _id: 2,
    post: "post1",
  }],
};

const server = setupServer(
  http.get("/posts/1/comments", () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("tests for Post component", () => {
  it("checking if all details render correctly", async () => {
    renderWithProviders(<Post {...mockProps} />, {
      preloadedState: initialState,
    });
    await waitFor(() => expect(screen.getByText(/name/i)).toBeInTheDocument());
    const postAuthorName = screen.getByText(/name/i);
    const imgAvatar = screen.getByAltText("author photo");
    const postText = screen.getByText(/text/i);
    const postImage = screen.getByAltText(/image with post/i);
    const likeIcon = screen.getByAltText("like icon");
    const numberOfLikes = screen.getByText(response.likes.length.toString());
    expect(postAuthorName).toBeInTheDocument();
    expect(imgAvatar).toBeInTheDocument();
    expect(postText).toBeInTheDocument();
    expect(postImage).toBeInTheDocument();
    expect(likeIcon).toBeInTheDocument();
    expect(numberOfLikes).toBeInTheDocument();
  }),
    it("renders child components", async () => {
      renderWithProviders(<Post {...mockProps} />, {
        preloadedState: initialState,
      });
      await waitFor(() => expect(screen.getByText(/name/i)).toBeInTheDocument());
      const addComment = screen.getByTestId("addComment");
      const commentCard = screen.getByTestId("commentCard");
      const postOptions = screen.getByTestId("postOptions");

      expect(addComment).toBeInTheDocument();
      expect(commentCard).toBeInTheDocument();
      expect(postOptions).toBeInTheDocument();
    });
});
