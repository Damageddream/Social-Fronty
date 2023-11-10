import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentOptions from "../../components/Comment/CommentOptions";
import { Provider } from "react-redux";
import store from "../../store/store";

vi.mock("../../customHooks/useOutsideClick", () => ({
  current: document.createElement("div"),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

const mockProps = {
  authorId: "id1",
  commentId: "id2",
  toggleShowEditComment: vi.fn(),
};

describe("CommentOptions component", () => {
  it("renders comment options detials", () => {
    render(
      <Provider store={store}>
        <CommentOptions {...mockProps} />
      </Provider>
    );

    const dots = screen.getAllByAltText("three dots");

    expect(dots).toBeInTheDocument();
  });
});
