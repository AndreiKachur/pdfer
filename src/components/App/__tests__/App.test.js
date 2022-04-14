import { render } from '@testing-library/react';

import App from '../App';

describe('App component', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
