import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { primaryDark, white } from './utils/colors';
import DeckDetails from './views/DeckDetails';
import Decks from './views/Decks';
import NewDeck from './views/NewDeck';
import NewQuestion from './views/NewQuestion';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: primaryDark }}>
      <Tab.Screen
        name="Decks"
        component={Decks}
        options={{
          tabBarIcon: ({ size, color }) =>
            Platform.OS === 'ios' ? (
              <Ionicons name="ios-apps" size={size} color={color} />
            ) : (
              <FontAwesome name="align-justify" size={size} color={color} />
            )
        }}
      />
      <Tab.Screen
        name="NewDeck"
        component={NewDeck}
        options={{
          title: 'New Deck',
          tabBarIcon: ({ size, color }) =>
            Platform.OS === 'ios' ? (
              <Ionicons
                name="ios-add-circle-outline"
                size={size}
                color={color}
              />
            ) : (
              <FontAwesome name="edit" size={size} color={color} />
            )
        }}
      />
    </Tab.Navigator>
  );
};

const AppStatusBar = ({ backgroundColor }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
        translucent
      />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStatusBar backgroundColor={primaryDark} />
        <Stack.Navigator
          screenOptions={{
            headerTintColor: white,
            headerStyle: { backgroundColor: primaryDark }
          }}
        >
          <Stack.Screen
            name="Home"
            component={TabNavigation}
            options={{ title: 'FlashCards' }}
          />
          <Stack.Screen
            name="DeckDetails"
            component={DeckDetails}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen name="Add Card" component={NewQuestion} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
