import ComputerIcon from 'react-native-vector-icons/MaterialIcons';
import TshirtIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MobileIcon from 'react-native-vector-icons/FontAwesome';

export const categoryIcons: Record<string, { icon: any; iconName: string }> = {
  computer: { icon: ComputerIcon, iconName: 'computer' },
  shoes: { icon: MaterialCommunityIcons, iconName: 'shoe-sneaker' },
  mobile: { icon: MobileIcon, iconName: 'mobile' },
  music: { icon: MaterialCommunityIcons, iconName: 'headphones' },
  clothes: { icon: TshirtIcon, iconName: 'tshirt' },
  others: { icon: MaterialCommunityIcons, iconName: 'devices' },
};
