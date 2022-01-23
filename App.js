import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import AddTask from './screens/add-task';
import LandingPage from './screens/landing-page';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={LandingPage}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;