import { screen } from "@testing-library/react";
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
            friends: ["friends"],
            invites: ["invite1", "invite2"],
            invitesSent: ["inviteSent1", "inviteSent2"]
        },
        timestamp: "01.01.1990",
        _id: 1,
        likes: ["1","2"],
        comments: ["1commment"],
        photo: "photo",
        

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
        const avatar = screen.getByAltText(/author photo/i)
        const authorName = screen.getByText(/name/i)
        const text = screen.getByText(/text/i)
        const postImage = screen.getByAltText(/image with post/i)
        const likeIcon = screen.getByAltText(/like icon/i)

        expect(avatar).toBeInTheDocument()
        expect(authorName).toBeInTheDocument()
        expect(text).toBeInTheDocument()
        expect(postImage).toBeInTheDocument()
        expect(likeIcon).toBeInTheDocument()
    }),
    it("checking if like is added", async () => {
        const user = userEvent.setup()
        renderWithProviders(<PostCard {...mockProps} />, {
            preloadedState: initialState
        })
        const likeIcon = screen.getByAltText(/like icon/i)
        expect(likeIcon).toBeInTheDocument()

        await user.click(likeIcon)

        expect(mockProps.newLikeAdded).toBeCalledTimes(1)
        
    }),
    it("checking if comment icon is clicked", async () => {
        const user = userEvent.setup()
        renderWithProviders(<PostCard {...mockProps} />, {
            preloadedState: initialState
        })
        const commentIcon = screen.getByAltText(/comment icon/i)
        expect(commentIcon).toBeInTheDocument()

        await user.click(commentIcon)

        expect(mockProps.setNav).toBeCalledTimes(1)
        expect(mockProps.setPostId).toBeCalledTimes(1)
        
    })

})