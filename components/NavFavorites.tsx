import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Point } from 'react-native-google-places-autocomplete';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import {
  selectOrigin,
  setDestination,
  setOrigin,
} from '../store/slices/navigationSlice';
import { HomeScreenProp } from './NavOptions';

const NavFavorites = ({ shouldSetOrigin }: { shouldSetOrigin?: boolean }) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <FlatList
      data={favoritesData.filter(
        // Checks to see if Home or Work is already selected
        (item) => shouldSetOrigin || origin?.location !== item.location
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tw`bg-gray-200`,
            {
              height: 0.5,
            },
          ]}
        />
      )}
      renderItem={({ item: { name, icon, location, description } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center py-5`}
          onPress={() => {
            if (shouldSetOrigin) {
              dispatch(
                setOrigin({
                  location,
                  description,
                })
              );
              navigation.navigate('MapScreen');
            } else {
              dispatch(
                setDestination({
                  location,
                  description,
                })
              );
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-bold text-lg`}>{name}</Text>
            <Text style={tw`text-gray-500`}>{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type FavoritesData = {
  id: string;
  name: string;
  icon: string;
  location: Point;
  description: string;
}[];

const favoritesData: FavoritesData = [
  {
    id: '234',
    icon: 'home',
    name: 'Home',
    location: { lat: 5.4945, lng: -0.4118 },
    description: 'Jordan Gospel Centre, Land of Grace',
  },
  {
    id: '567',
    icon: 'briefcase',
    name: 'Work',
    location: { lat: 5.5497, lng: -0.3522 },
    description: 'Finger Bites Kitchen, Mile 11',
  },
];

export default NavFavorites;
