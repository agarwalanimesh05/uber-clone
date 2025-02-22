import React from 'react';
import { render, screen } from '@testing-library/react-native';

import EatsScreen from '../EatsScreen';
import { navData } from '../../components/NavOptions';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('<EatsScreen />', () => {
  test('renders correctly', () => {
    const { getByText, getByTestId } = render(<EatsScreen />);

    expect(getByTestId('image')).toHaveProp('source', {
      uri: navData[1].image,
    });
    expect(getByText('Not yet implemented...')).toBeTruthy();
  });

  test('displays the correct image', () => {
    const { getByTestId } = render(<EatsScreen />);

    expect(getByTestId('image')).toHaveProp('source', {
      uri: navData[1].image,
    });
  });
});
