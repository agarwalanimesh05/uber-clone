import { TouchableOpacity, View } from 'react-native';

import { HomeScreenProp } from '../components/NavOptions';
import { Icon } from '@rneui/themed';
import Map from '../components/Map';
import MapScreenNavigation from '../components/MapScreenNavigation';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`bg-gray-50 absolute top-8 left-4 z-50 p-3 rounded-full shadow-lg`}
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
