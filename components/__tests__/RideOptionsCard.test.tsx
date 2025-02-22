import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import RideOptionsCard from '../RideOptionsCard';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

describe('<RideOptionsCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    (useSelector as any).mockReturnValue({
      distance: { text: '10 km' },
      duration: { text: '20 mins', value: 1200 },
    });

    const { getByText } = render(<RideOptionsCard />);

    expect(getByText('Select a Ride - 10 km')).toBeTruthy();
    expect(getByText('UberX')).toBeTruthy();
    expect(getByText('Uber XL')).toBeTruthy();
    expect(getByText('Uber LUX')).toBeTruthy();
  });

  test('renders correctly for IOS', () => {
    (useSelector as any).mockReturnValue({
      distance: { text: '10 km' },
      duration: { text: '20 mins', value: 1200 },
    });

    jest.mock('react-native/Libraries/Utilities/Platform.ios.js', () => ({
      ...jest.requireActual(
        'react-native/Libraries/Utilities/Platform.android.js'
      ),
    }));

    const { getByText } = render(<RideOptionsCard />);

    expect(getByText('Select a Ride - 10 km')).toBeTruthy();
    expect(getByText('UberX')).toBeTruthy();
    expect(getByText('Uber XL')).toBeTruthy();
    expect(getByText('Uber LUX')).toBeTruthy();
  });

  test('navigates back on back button press', () => {
    (useSelector as any).mockReturnValue({
      distance: { text: '10 km' },
      duration: { text: '20 mins', value: 1200 },
    });

    const { getByTestId } = render(<RideOptionsCard />);

    fireEvent.press(getByTestId('backButton'));

    expect(mockGoBack).toHaveBeenCalled();
  });

  test('selects a ride and enables the choose button', () => {
    (useSelector as any).mockReturnValue({
      distance: { text: '10 km' },
      duration: { text: '20 mins', value: 1200 },
    });

    const { getByText } = render(<RideOptionsCard />);

    fireEvent.press(getByText('UberX'));

    expect(getByText('Choose UberX')).toBeTruthy();
  });

  test('displays correct price for each ride', () => {
    (useSelector as any).mockReturnValue({
      distance: { text: '10 km' },
      duration: { text: '20 mins', value: 1200 },
    });

    const { getByText } = render(<RideOptionsCard />);

    expect(getByText('₹180.00')).toBeTruthy(); // UberX price
    expect(getByText('₹216.00')).toBeTruthy(); // Uber XL price
    expect(getByText('₹315.00')).toBeTruthy(); // Uber LUX price
  });
});
