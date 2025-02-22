import reducer, {
  setOrigin,
  setDestination,
  setTravelTimeInfo,
  selectOrigin,
  selectDestination,
  selectTravelTimeInfo,
} from '../navigationSlice';

describe('navigationSlice', () => {
  const initialState = {
    origin: null,
    destination: null,
    travelTimeInfo: null,
  };

  test('should handle setOrigin', () => {
    const origin = {
      location: { lat: 37.7749, lng: -122.4194 },
      description: 'San Francisco, CA',
    };
    const action = { type: setOrigin.type, payload: origin };
    const state = reducer(initialState, action);
    expect(state.origin).toEqual(origin);
  });

  test('should handle setDestination', () => {
    const destination = {
      location: { lat: 34.0522, lng: -118.2437 },
      description: 'Los Angeles, CA',
    };
    const action = { type: setDestination.type, payload: destination };
    const state = reducer(initialState, action);
    expect(state.destination).toEqual(destination);
  });

  test('should handle setTravelTimeInfo', () => {
    const travelTimeInfo = {
      distance: { text: '10 km', value: 10000 },
      duration: { text: '10 mins', value: 600 },
      status: 'OK',
    };
    const action = { type: setTravelTimeInfo.type, payload: travelTimeInfo };
    const state = reducer(initialState, action);
    expect(state.travelTimeInfo).toEqual(travelTimeInfo);
  });

  test('should select origin', () => {
    const state = {
      navigation: {
        ...initialState,
        origin: {
          location: { lat: 37.7749, lng: -122.4194 },
          description: 'San Francisco, CA',
        },
      },
    };
    expect(selectOrigin(state)).toEqual(state.navigation.origin);
  });

  test('should select destination', () => {
    const state = {
      navigation: {
        ...initialState,
        destination: {
          location: { lat: 34.0522, lng: -118.2437 },
          description: 'Los Angeles, CA',
        },
      },
    };
    expect(selectDestination(state)).toEqual(state.navigation.destination);
  });

  test('should select travelTimeInfo', () => {
    const state = {
      navigation: {
        ...initialState,
        travelTimeInfo: {
          distance: { text: '10 km', value: 10000 },
          duration: { text: '10 mins', value: 600 },
          status: 'OK',
        },
      },
    };
    expect(selectTravelTimeInfo(state)).toEqual(
      state.navigation.travelTimeInfo
    );
  });
});
