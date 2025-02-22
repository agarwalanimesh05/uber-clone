import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import NavOptions, { navData } from '../NavOptions';

const mockNavigate = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('<NavOptions />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    (useSelector as any).mockReturnValue(null);

    const { getByText } = render(<NavOptions />);

    navData.forEach((item) => {
      expect(getByText(item.title)).toBeTruthy();
    });
  });

  test('disables buttons when origin is not set', () => {
    (useSelector as any).mockReturnValue(null);

    const { getByText } = render(<NavOptions />);

    navData.forEach((item) => {
      const button = getByText(item.title).parent?.parent;
      expect(button).toHaveStyle({ opacity: 0.2 });
    });
  });

  test('enables buttons and navigates when origin is set', () => {
    (useSelector as any).mockReturnValue({
      location: { lat: 0, lng: 0 },
      description: 'Test Origin',
    });

    const { getByText } = render(<NavOptions />);

    navData.forEach((item) => {
      const button = getByText(item.title).parent?.parent;
      expect(button).not.toHaveStyle({ opacity: 0.2 });

      if (button) {
        fireEvent.press(button);
        expect(mockNavigate).toHaveBeenCalledWith(item.screen);
      }
    });
  });
});
