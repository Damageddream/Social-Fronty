import ProfileOptions from "../../components/Profile/ProfileOptions";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen } from "@testing-library/react";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const mockProps = {
  userId: "1",
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

describe("test for profile options component", () => {
  it("should render the component correctly", () => {
    renderWithProviders(<BrowserRouter><ProfileOptions {...mockProps} /></BrowserRouter>, {
        preloadedState: initialState,
      });
    const image = screen.getByAltText("icon of gearwheel");
    expect(image).toBeInTheDocument();
    const deleteBtn = screen.queryByText("Delete");
    expect(deleteBtn).not.toBeInTheDocument();

  }),
  it("toggle delete section correctly",  async () => {
    const user = userEvent.setup();
    renderWithProviders(<BrowserRouter><ProfileOptions {...mockProps} /></BrowserRouter>, {
        preloadedState: initialState,
      });
    const image = screen.getByAltText("icon of gearwheel");
    await user.click(image);
    const deleteBtn = screen.getByText("Delete");
    expect(deleteBtn).toBeInTheDocument();

  })
  it("should delete profile correctly", async () => {
    const user = userEvent.setup();
    renderWithProviders(<BrowserRouter><ProfileOptions {...mockProps} /></BrowserRouter>, {
      preloadedState: initialState,
    });
    const image = screen.getByAltText("icon of gearwheel");
    await user.click(image);
    const deleteBtn = screen.getByText("Delete");
    expect(deleteBtn).toBeInTheDocument();
    await user.click(deleteBtn);

  });
});