import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

import NavigateCard from '../NavigateCard';
import { setDestination } from '../../store/slices/navigationSlice';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('<NavigateCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByText } = render(<NavigateCard />);

    expect(getByText('Good morning, Animesh')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Rides')).toBeTruthy();
    expect(getByText('Eats')).toBeTruthy();
  });

  test('dispatches setDestination and navigates to RideOptionsCard on GooglePlacesAutocomplete press', () => {
    const { getByPlaceholderText } = render(<NavigateCard />);

    fireEvent.press(
      getByPlaceholderText('Where to?'),
      { description: 'Test Place' },
      { geometry: { location: { lat: 0, lng: 0 } } }
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setDestination({
        location: { lat: 0, lng: 0 },
        description: 'Test Place',
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('RideOptionsCard');
  });

  test('navigates to RideOptionsCard on Rides button press', () => {
    const { getByText } = render(<NavigateCard />);

    fireEvent.press(getByText('Rides'));

    expect(mockNavigate).toHaveBeenCalledWith('RideOptionsCard');
  });

  test('does not navigate on Eats button press', () => {
    const { getByText } = render(<NavigateCard />);

    fireEvent.press(getByText('Eats'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
