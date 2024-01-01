import AddNewFriend from "../../components/Wall/AddNewFriend";
import { renderWithProviders } from "../../utilities/utilsForTest";
import { screen, waitFor } from "@testing-library/react";
import initialState from "../testUtilities/initialState";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

vi.mock('../../components/Wall/Search.tsx', ()=>{
    return {
        default: () => {
            return <div data-testid="search" />
        }
    }
})
vi.mock('../../components/Wall/AddNewSingle.tsx', ()=>{
    return {
        default: () => {
            return <div data-testid="addnew" />
        }
    }
})

const response = {
    success: true,
    noFriends: [
      {
        name: 'John Doe',
        photo: 'path/to/photo1',
        _id: '1',
        friends: [],
        invites: [],
        invitesSent: [],
      },
      {
        name: 'Jane Doe',
        photo: 'path/to/photo2',
        _id: '2',
        friends: [],
        invites: [],
        invitesSent: [],
      },
    ],
  };

  const server = setupServer(
    http.get(`/users/nofriends`, () => {
      return HttpResponse.json(response);
    })
  );

  // Start server before all tests
beforeAll(() => {
    // Start server
    server.listen({ onUnhandledRequest: "error" });
  });

  //  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("test for add new friend component", () => {
    it("should render the component correctly", () => {
        renderWithProviders(<BrowserRouter><AddNewFriend /></BrowserRouter>, {
            preloadedState: initialState,
          });
        const header = screen.getByRole('heading', {name: "Search for friends"})
        const searchComponent = screen.getByTestId("search")
        const addNewComponent = screen.queryByTestId("addnew")
        expect(searchComponent).toBeInTheDocument()
        expect(addNewComponent).not.toBeInTheDocument()
        expect(header).toBeInTheDocument()
    })
    it("fetching stranger correctly", async () => {
        renderWithProviders(<BrowserRouter><AddNewFriend /></BrowserRouter>, {
            preloadedState: initialState,
          });
          const addNewComponent = screen.queryByTestId("addnew")
          expect(addNewComponent).not.toBeInTheDocument()
          await waitFor(() => {
            const addNewComponents = screen.getAllByTestId("addnew");
            expect(addNewComponents.length).toBeGreaterThan(0);
            addNewComponents.forEach(component => {
              expect(component).toBeInTheDocument();
            });
          });
    })})
