import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectTravelTimeInfo } from '../store/slices/navigationSlice';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<RidesData[0] | null>(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`mt-4 flex-row ml-5 `}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`rounded-full`}
          testID="backButton"
        >
          <Icon
            name={Platform.OS === 'ios' ? 'ios-chevron-back' : 'arrow-back'}
            type="ionicon"
          />
        </TouchableOpacity>
        <Text style={tw`text-center mb-5 text-lg flex-1`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={ridesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw.style(
              `flex-row justify-between items-center px-6`,
              id === selected?.id && 'bg-gray-200'
            )}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{
                uri: image,
              }}
            />
            <View style={tw`-ml-8`}>
              <Text style={tw`text-lg font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-lg`}>
              {new Intl.NumberFormat('en-IN', {
                currency: 'INR',
                style: 'currency',
              }).format(
                ((travelTimeInformation?.duration?.value || 0) *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw.style(`bg-black py-3 m-3`, !selected && 'bg-gray-200')}
        >
          <Text style={tw`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type RidesData = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}[];

const ridesData: RidesData = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const SURGE_CHARGE_RATE = 15;

export default RideOptionsCard;
