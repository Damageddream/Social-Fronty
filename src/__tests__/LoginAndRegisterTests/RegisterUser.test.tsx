import Register from "../../components/LoginAndRegister/RegisterUser";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";

const response = {
    sucess: true
}

const mockProps = {
    backToDefault: vi.fn()
}

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

  describe("test for RegisterUser component", () => {
    it("check if all details render correctly", () => {
        renderWithProviders(<Register {...mockProps} />, {
            preloadedState: initialState
        })
        const nameInput = screen.getByLabelText("Name")
        const passwordInput = screen.getByLabelText("Password")
        const confirmPasswordInput = screen.getByLabelText("Confirm password")
        const choicePhotoInput = screen.getByLabelText(/choose profile photo/i)
        const registerBtn = screen.getByRole("button",{name: "Register"})
        const backBtn = screen.getByRole("button", {name: "back"})
        
        expect(nameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(confirmPasswordInput).toBeInTheDocument()
        expect(choicePhotoInput).toBeInTheDocument()
        expect(registerBtn).toBeInTheDocument()
        expect(backBtn).toBeInTheDocument()


    }),
    it("check if submiting register form works", async ()=>{
        const user = userEvent.setup()
        renderWithProviders(<Register {...mockProps} />, {
            preloadedState: initialState
        })
        const file = new File(["dummy content"], "image.jpg", {
            type: "image/jpeg"
          });
        const nameInput = screen.getByLabelText(/name/i)
        const passwordInput = screen.getByLabelText("Password")
        const confirmPasswordInput = screen.getByLabelText("Confirm password")
        const choicePhotoInput = screen.getByLabelText(/choose profile photo/i)
        const registerBtn = screen.getByRole("button",{name: "Register"})
 
        await user.type(nameInput, "name")
        await user.type(passwordInput, "password")
        await user.type(confirmPasswordInput, "password")
        await user.upload(choicePhotoInput, file)
        await user.click(registerBtn)

        expect(registerBtn).toHaveTextContent("")

    })
  })