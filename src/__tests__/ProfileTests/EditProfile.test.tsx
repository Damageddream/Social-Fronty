import EditProfile from "../../components/Profile/EditProfile";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import initialState from "../testUtilities/initialState";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { BrowserRouter } from "react-router-dom";

const mockProps = {
  orginalName: "name",
  userId: "1id",
};

const response = {
  sucess: true,
  message: "sucess",
};

const server = setupServer(
  http.post(`/posts/comments`, () => {
    return HttpResponse.json(response);
  })
);

// Start server before all tests
beforeAll(() => {
    // Start server
    server.listen({ onUnhandledRequest: "error" });
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("test for edit profile component", () => {
  it("should render the component correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <EditProfile {...mockProps} />
      </BrowserRouter>,
      {
        preloadedState: initialState,
      }
    );

    const exitBtn = screen.getByText("X");
    const info = screen.getByText(
      /You will be logout after editing, login to see changes/i
    );
    const textInput = screen.getByLabelText(/name:/i);
    const photoInput = screen.getByLabelText(/photo/i);
    const editBtn = screen.getByText("Edit profile");

    expect(exitBtn).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(photoInput).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
  });
});
