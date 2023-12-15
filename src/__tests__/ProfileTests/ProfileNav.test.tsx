import ProfileNav from "../../components/Profile/ProfileNav";
import { getByText, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";

vi.mock("../../components/Profile/EditProfile.tsx", ()=>{
    return {
        default: () => {
            return <div data-testid="editprofile" />
        }
    }
})

vi.mock("../../components/Profile/ProfileOptions.tsx", () => {
    return {
        default: ()=> {
            return <div data-testid="profileoptions" />
        }
    }
})

vi.mock("../../components/LoginAndRegister/Logout.tsx", () => {
    return {
        default: () => {
            return <div data-testid="logout" />
        }
    }
})

const inital = {...initialState}
inital.user.loggedIn = true
inital.modal.showUser = true

describe("test profile nav component", ()=>{
    it("testing if all detials renders correctly", ()=>{
        renderWithProviders(<ProfileNav />,{
            preloadedState: inital
        } )
        
        const profilePhoto = screen.getByAltText("user profile picture")
        const userName = screen.getByText(inital.user.name)
        const logoutComponent = screen.getByTestId("logout")
        const profileOptionsComponent = screen.getByTestId("profileoptions")
        const editProfileComponent = screen.getByTestId("editprofile")
        
        expect(profilePhoto).toBeInTheDocument()
        expect(userName).toBeInTheDocument()
        expect(logoutComponent).toBeInTheDocument()
        expect(profileOptionsComponent).toBeInTheDocument()
        expect(editProfileComponent).toBeInTheDocument()
        
    })
})