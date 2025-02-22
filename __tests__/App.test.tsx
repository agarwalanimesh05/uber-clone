/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-redux', () => ({
  Provider: jest.fn(),
}));

describe('<HomeNavigation/>', () => {
  test('renders correctly', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<App />);
    });
  });

  test('renders correctly ios', async () => {
    jest.mock('react-native/Libraries/Utilities/Platform.ios.js', () => ({
      ...jest.requireActual(
        'react-native/Libraries/Utilities/Platform.android.js'
      ),
    }));

    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<App />);
    });
  });
});
