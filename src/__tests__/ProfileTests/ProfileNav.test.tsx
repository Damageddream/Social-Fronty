import ProfileNav from "../../components/Profile/ProfileNav";
import { screen } from "@testing-library/react";
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

const inital = {...initialState}
inital.user.loggedIn = true
inital.modal.showUser = true

describe("test profile nav component", ()=>{
    it("testing if all detials renders correctly", ()=>{
        renderWithProviders(<ProfileNav />,{
            preloadedState: inital
        } )
            
        
    })
})