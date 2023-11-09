import {screen, render } from '@testing-library/react';
import "@testing-library/jest-dom";
import CommentOptions from '../../components/Comment/CommentOptions';


vi.mock('../../customHooks/useToggle', ()=>({
    default: vi.fn()
}))

vi.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }));