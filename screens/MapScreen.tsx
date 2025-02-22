import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

import Map from '../components/Map';
import MapScreenNavigation from '../components/MapScreenNavigation';
import { HomeScreenProp } from '../components/NavOptions';

const MapScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`bg-gray-50 absolute top-8 left-4 z-50 p-3 rounded-full shadow-lg`}
        testID="backButton"
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <MapScreenNavigation />
      </View>
    </View>
  );
};

export default MapScreen;
