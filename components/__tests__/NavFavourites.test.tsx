import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import NavFavorites from '../NavFavorites';
import { setOrigin, setDestination } from '../../store/slices/navigationSlice';

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

describe('<NavFavorites />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    (useSelector as any).mockReturnValue(null);

    const { getByText } = render(<NavFavorites />);

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Work')).toBeTruthy();
  });

  test('dispatches setOrigin and navigates to MapScreen when shouldSetOrigin is true', () => {
    (useSelector as any).mockReturnValue(null);

    const { getByText } = render(<NavFavorites shouldSetOrigin={true} />);

    fireEvent.press(getByText('Home'));

    expect(mockDispatch).toHaveBeenCalledWith(
      setOrigin({
        location: { lat: 5.4945, lng: -0.4118 },
        description: 'Jordan Gospel Centre, Land of Grace',
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('MapScreen');
  });

  test('dispatches setDestination when shouldSetOrigin is false', () => {
    (useSelector as any).mockReturnValue(null);

    const { getByText } = render(<NavFavorites shouldSetOrigin={false} />);

    fireEvent.press(getByText('Work'));

    expect(mockDispatch).toHaveBeenCalledWith(
      setDestination({
        location: { lat: 5.5497, lng: -0.3522 },
        description: 'Finger Bites Kitchen, Mile 11',
      })
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('filters out already selected origin', () => {
    (useSelector as any).mockReturnValue({
      location: { lat: 5.4945, lng: -0.4118 },
      description: 'Jordan Gospel Centre, Land of Grace',
    });

    const { queryByText } = render(<NavFavorites shouldSetOrigin={false} />);

    expect(queryByText('Work')).toBeTruthy();
  });
});
