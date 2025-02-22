import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import MapScreen from '../MapScreen';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../components/Map', () => {
  const { View } = require('react-native');
  return () => <View testID="mapComponent" />;
});

jest.mock('../../components/MapScreenNavigation', () => {
  const { View } = require('react-native');
  return () => <View testID="mapScreenNavigationComponent" />;
});

describe('<MapScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByTestId } = render(<MapScreen />);

    expect(getByTestId('mapComponent')).toBeTruthy();
    expect(getByTestId('mapScreenNavigationComponent')).toBeTruthy();
  });

  test('navigates back on menu button press', () => {
    const { getByTestId } = render(<MapScreen />);

    fireEvent.press(getByTestId('backButton'));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
