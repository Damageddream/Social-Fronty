import Wall from "../Wall";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./../utilities/utilsForTest";
import "@testing-library/jest-dom";
import initialState from "./testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../components/Post/AddPost.tsx", () => {
  return {
    default: () => {
      return <div data-testid="addpost" />;
    },
  };
});
vi.mock("../../components/Post/PostCard.tsx", () => {
  return {
    default: () => {
      return <div data-testid="postcard" />;
    },
  };
});
vi.mock("../../components/Profile/ProfileNav.tsx", () => {
  return {
    default: () => {
      return <div data-testid="profilenav" />;
    },
  };
});
vi.mock("../../components/Wall/WallNav.tsx", () => {
  return {
    default: () => {
      return <div data-testid="wallnav" />;
    },
  };
});

const response = {
  success: true,
  message: "posts",
  posts: [
    {
      text: "text",
      author: {
        name: "John Doe",
        photo: "path/to/photo1",
        _id: "1",
        friends: [],
        invites: [],
        invitesSent: [],
      },
      timestamp: "2021-08-31T12:00:00.000Z",
      likes: [],
      _id: "1",
      comments: [],
      photo: "path/to/photo1",
    },
    {
      text: "text",
      author: {
        name: "Marry",
        photo: "path/to/photo1",
        _id: "2",
        friends: [],
        invites: [],
        invitesSent: [],
      },
      timestamp: "2021-08-31T12:00:00.000Z",
      likes: [],
      _id: "2",
      comments: [],
      photo: "path/to/photo2",
    },
  ],
};

const server = setupServer(
  http.get(`/wall`, () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => {
  // Start server
  server.listen({ onUnhandledRequest: "error" });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("test for Wall component", () => {
  it("renders all detail correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <Wall />
      </BrowserRouter>,
      {
        preloadedState: initialState,
      }
    );
    const header = screen.getByRole("heading", { name: "Your Circle" });
    const addPostBtn = screen.getByRole("button", { name: "Add new post" });
    const noPost = screen.getByText("No Posts");
    const searchFriendsNav = screen.getByText(/Search for friend/i);
    const myFriendsNav = screen.getByText(/Your friends/i);
    const addFriendsNav = screen.getByText(/Add new friends/i);
    expect(header).toBeInTheDocument();
    expect(addPostBtn).toBeInTheDocument();
    expect(noPost).toBeInTheDocument();
    expect(searchFriendsNav).toBeInTheDocument();
    expect(myFriendsNav).toBeInTheDocument();
    expect(addFriendsNav).toBeInTheDocument();

  }),
  it("fetching posts", async () => {
    renderWithProviders(
      <BrowserRouter>
        <Wall />
      </BrowserRouter>,
      {
        preloadedState: initialState,
      }
    );
    const post = await screen.findAllByText("text");
    expect(post.length).toBe(2);
  })
});
