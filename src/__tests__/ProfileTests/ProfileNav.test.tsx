import ProfileNav from "../../components/Profile/ProfileNav";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";



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

const logoutFunction = vi.fn();

vi.mock("../../components/LoginAndRegister/Logout.tsx", () => {

    return {
      default: () => <div data-testid="logout" onClick={logoutFunction} />,
    };
  });

const inital = {...initialState}
inital.user.loggedIn = true
inital.modal.showUser = true

describe("test profile nav component", ()=>{
    it("testing if all detials renders correctly", ()=>{
        renderWithProviders(<ProfileNav />,{
            preloadedState: inital
        } )
        
        const profilePhoto = screen.getByAltText("user profile picture")
        const userName = screen.getAllByText(inital.user.name)
        const logoutComponent = screen.getByTestId("logout")
        const profileOptionsComponent = screen.getByTestId("profileoptions")
        const editProfileComponent = screen.getByTestId("editprofile")
        
        expect(profilePhoto).toBeInTheDocument()
        userName.forEach((userNameElement) => {
            expect(userNameElement).toBeInTheDocument()
          })
        expect(logoutComponent).toBeInTheDocument()
        expect(profileOptionsComponent).toBeInTheDocument()
        expect(editProfileComponent).toBeInTheDocument()
        
    }),
    it("testing if logout component works correctly", async ()=>{
        const user = userEvent.setup()
        renderWithProviders(<ProfileNav />,{
            preloadedState: inital
        } )
        const logoutComponent = screen.getByTestId("logout");
        await user.click(logoutComponent);
      
        expect(logoutFunction).toHaveBeenCalled();
    })
})