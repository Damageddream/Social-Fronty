import {render, screen } from '@testing-library/react'
import App from './App'

it("Should render", ()=>{
    render(<App />)
    const p = screen.queryByText("hiasd")
    expect(p).toBeCalled()

})