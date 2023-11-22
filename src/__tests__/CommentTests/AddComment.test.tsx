import AddComment from "../../components/Comment/AddComment";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { SetupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";

vi.mock("../../customHooks/useToggle", () => ({
    default: vi.fn(() => [true, vi.fn()]),
  }));

const mockProps = {
    postID: "id1",
    handleAddComment: vi.fn()
}

describe("Add Comment component", () => {
    it("render AddComment component details", async () => {
        const user = userEvent.setup()
        renderWithProviders(<AddComment {...mockProps} />, {
            preloadedState: initialState,
        })

    const addCommentBtn = screen.getByText("Add comment")
    expect(addCommentBtn).toBeInTheDocument()
    await user.click(addCommentBtn)
    const x = screen.getByText('X')
    const comment = screen.getByText(/Comment:/i)
    expect(x).toBeInTheDocument()
    expect(comment).toBeInTheDocument()


    })
})

