import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Userprofile from './src/screens/Userprofile';
import Productpage from './src/screens/Productpage';
import UserCart from './src/screens/UserCart';
import Placeorder from './src/screens/Placeorder';
import TrackOrder from './src/screens/TrackOrder';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
   <NavigationContainer>
    
    <Stack.Navigator initialRouteName='welcomepage'>
    
    <Stack.Screen name="welcomepage" component={WelcomeScreen} 
    options={{
      headerShown: false,
    }}
    />
    
    <Stack.Screen name="signup" component={SignupScreen} 
    options={{
      headerShown: false,
    }}
    />
    
    <Stack.Screen name="login" component={LoginScreen} 
    options={{
      headerShown: false,
    }}
    />
    
    <Stack.Screen name="home" component={HomeScreen} 
    options={{
      headerShown: false,
    }}
    />
    
    <Stack.Screen name="userprofile" component={Userprofile} 
    options={{
      headerShown: false,
    }}
    />
    
    
    <Stack.Screen name="productpage" component={Productpage} 
    options={{
      headerShown: false,
    }}
    />
    
    
    <Stack.Screen name="cart" component={UserCart} 
    options={{
      headerShown: false,
    }}
    />
    
    <Stack.Screen name="placeorder" component={Placeorder} 
    options={{
      headerShown: false,
    }}
    />
    
    
    <Stack.Screen name="trackorder" component={TrackOrder} 
    options={{
      headerShown: false,
    }}
    />
    
  </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
