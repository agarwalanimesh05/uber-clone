import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import Map from '../Map';
import { setTravelTimeInfo } from '../../store/slices/navigationSlice';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-native-dotenv', () => ({ GOOGLE_MAPS_API_KEY: 'value' }));

jest.spyOn(window as any, 'fetch').mockImplementationOnce(() => {
  return Promise.resolve({
    json: () => Promise.resolve({ data: 'fakeDireactData' }),
  });
});

describe('<Map/>', () => {
  test('renders', async () => {
    render(<Map />);
    expect(screen.getByTestId('MapView')).toBeOnTheScreen();
  });

  //   test('renders with store data', async () => {
  //     const mockOrigin = {
  //       location: { lat: 37.78825, lng: -122.4324 },
  //       description: 'origin',
  //     };

  //     (useSelector as any).mockImplementation((selectorFn: any) =>
  //       selectorFn({
  //         navigation: {
  //           origin: mockOrigin,
  //           destination: null,
  //         },
  //       })
  //     );

  //     render(<Map />);

  //     expect(screen.getByTestId('MapView')).toBeOnTheScreen();
  //   });

  test('calls getTravelTime and dispatches setTravelTimeInfo', async () => {
    const mockOrigin = {
      location: { lat: 37.78825, lng: -122.4324 },
      description: 'origin',
    };
    const mockDestination = {
      location: { lat: 37.78825, lng: -122.4324 },
      description: 'destination',
    };

    (useSelector as any).mockImplementation((selectorFn: any) =>
      selectorFn({
        navigation: {
          origin: mockOrigin,
          destination: mockDestination,
        },
      })
    );

    const mockData = {
      rows: [
        {
          elements: [
            {
              duration: { text: '10 mins', value: 600 },
              distance: { text: '5 km', value: 5000 },
              status: 'OK',
            },
          ],
        },
      ],
    };

    (window as any).fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(<Map />);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        setTravelTimeInfo(mockData.rows[0].elements[0])
      );
    });
  });
});
