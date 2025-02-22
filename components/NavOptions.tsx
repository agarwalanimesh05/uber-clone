import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { StackList } from './HomeNavigation';
import { selectOrigin } from '../store/slices/navigationSlice';

const NavOptions = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => navigation.navigate(item.screen)}
          style={tw`pr-2 pl-6 pt-4 pb-8 bg-gray-200 mr-2 mb-5 w-40 rounded-md`}
        >
          <View style={tw.style(!origin && 'opacity-20')}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
            />
            <Text style={tw`mt-2 text-lg font-bold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-6`}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type NavData = {
  id: string;
  title: string;
  image: string;
  screen: keyof StackList;
}[];

export const navData: NavData = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order Food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

export type HomeScreenProp = NativeStackNavigationProp<StackList, 'HomeScreen'>;

export default NavOptions;
