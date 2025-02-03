import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Home from '../src/app/page'
 
describe('Home Page', () => {
  it('renders home page without crashing', () => {
    render(<Home />)
  })
})