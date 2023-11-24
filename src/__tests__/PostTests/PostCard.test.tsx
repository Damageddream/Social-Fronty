import { screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utilities/utilsForTest";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import PostCard from "../../components/Post/PostCard";

const mockProps = {
    post: {
        text: "text",
        author: {
            name: "name",
            photo: "path/photo",
            _id: "authorId1",
            friends: [""],
            invites: ["invite1", "invite2"],
            invitesSent: ["inviteSent1", "inviteSent2"]
        }
    },
    newLikeAdded: vi.fn(),
    setNav: vi.fn(),
    setPostId: vi.fn(),
}

describe("Testing PostCard component", () => {
    it("checking if all details render correctly", () => {
        renderWithProviders(<PostCard {...mockProps} />, {
            preloadedState: initialState
        })
    })

    const avatar = screen.getByAltText("author photo")
})