import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { NavigationContainer } from '@react-navigation/native';

import HomeNavigation from '../HomeNavigation';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('<HomeNavigation/>', () => {
  test('renders', async () => {
    jest.useFakeTimers();

    render(
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
    );
    expect(screen.getByText('Get a ride')).toBeTruthy();
  });
});
