import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import ProfileScreen from './Profile';
import HomeScreen from './Home';
import {MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();
function HomeTabs({route, navigation}: any) {
  const {token} = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={25} />,
        }}
        initialParams={{token: token}}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
