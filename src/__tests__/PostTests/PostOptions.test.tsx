import PostOptions from "../../components/Post/PostOptions";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../components/Post/EditPost", () => {
  return {
    default: () => {
      return <div data-testid="editPost" />;
    },
  };
});

const extendedInitialState = {
  ...initialState,
  modal: {
    ...initialState.modal,
    showPost: true,
  },
};

const mockProps = {
  authorId: "id1",
  postId: "1postId",
  orginalText: "text",
  likes: ["1", "2"],
  comments: ["comment1", "comment2"],
};

const response = {
  sucess: true,
  message: "success",
};

const server = setupServer(
  http.post("path/post.com", () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("tests for PostOptions component", () => {
  it("check if all details render correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <PostOptions {...mockProps} />
      </BrowserRouter>,
      {
        preloadedState: extendedInitialState,
      }
    );

    const dotsImage = screen.getByAltText("three dots");
    expect(dotsImage).toBeInTheDocument();
  }),
    it("toggles showOptions", async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <PostOptions {...mockProps} />
        </BrowserRouter>,
        {
          preloadedState: extendedInitialState,
        }
      );
  

      const dotsImage = screen.getByAltText("three dots");
      const editBtnBefore = screen.queryByText(/edit/i);
      const deleteBtnBefore = screen.queryByText(/delete/i);
      expect(editBtnBefore).not.toBeInTheDocument();
      expect(deleteBtnBefore).not.toBeInTheDocument();
      expect(dotsImage).toBeInTheDocument();

      await user.click(dotsImage);

      const editPostComponent = screen.getByTestId("editPost");
      const editBtn = screen.getByText(/edit/i);
      const deleteBtn = screen.getByText(/delete/i);
      expect(editBtn).toBeInTheDocument();
      expect(deleteBtn).toBeInTheDocument();
      expect(editPostComponent).toBeInTheDocument();
    }),
    it("testing deleting post", async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <PostOptions {...mockProps} />
        </BrowserRouter>,
        {
          preloadedState: extendedInitialState,
        }
      );
  
      const dotsImage = screen.getByAltText("three dots");
      await user.click(dotsImage);
      const deleteBtn = screen.getByText(/delete/i);
      await user.click(deleteBtn);
      expect(deleteBtn).toHaveTextContent("");
    });
});
