import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { NavigationContainer } from '@react-navigation/native';

import MapScreenNavigation from '../MapScreenNavigation';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('<MapScreenNavigation/>', () => {
  test('renders', async () => {
    jest.useFakeTimers();

    render(
      <NavigationContainer>
        <MapScreenNavigation />
      </NavigationContainer>
    );
    expect(screen.getByText('Good morning, Animesh')).toBeTruthy();
  });
});
