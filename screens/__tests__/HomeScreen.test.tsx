import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';

import HomeScreen from '../HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { setDestination, setOrigin } from '../../store/slices/navigationSlice';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('<HomeScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByTestId('image')).toHaveProp('source', {
      uri: 'https://links.papareact.com/gzs',
    });
    expect(getByPlaceholderText('Where from?')).toBeTruthy();
  });

  test('dispatches setOrigin and setDestination on GooglePlacesAutocomplete press', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    fireEvent.press(
      getByPlaceholderText('Where from?'),
      { description: 'Test Place' },
      { geometry: { location: { lat: 0, lng: 0 } } }
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setOrigin({
        location: { lat: 0, lng: 0 },
        description: 'Test Place',
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(setDestination(null));
  });
});
