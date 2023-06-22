import { getByTestId, render } from '@testing-library/react'
import renderer from 'react-test-renderer'

import CurrencyView from '../UI/currency-view/currency-view'

describe('Test CurrencyView', () => {
  test('Snapshot Test', () => {
    const tree = renderer.create(<CurrencyView />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Value Test', () => {
    const { container } = render(<CurrencyView value={123} />)
    const value = getByTestId(container, 'value')
    expect(value.textContent).toBe('123')
  })
})
