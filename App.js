import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthComponent from './Login_Signup/Auth';
import HomeScreen from './Home/Home';
import Dashboard from './screens/Dashboard';
import Medications from './screens/Medications';
import Doctors from './screens/Doctors';
import Appointments from './screens/Appointments';
import Reminders from './screens/Reminders';
import Reports from './screens/Reports';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthComponent} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Medications" component={Medications} />
        <Stack.Screen name="Doctors" component={Doctors} />
        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="Reminders" component={Reminders} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
