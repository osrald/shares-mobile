import "react-native-gesture-handler";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import EarlyRegistrationScreen from "./app/screens/EarlyRegistrationScreen";
import LRNValidator from "./app/screens/LRNValidator";
import EarlyRegistrationInfoScreen from "./app/screens/EarlyRegistrationInfoScreen";
import AboutScreen from "./app/screens/AboutScreen";
import EnrollmentScreen from "./app/screens/EnrollmentScreen";
import EnrollmentInfoScreen from "./app/screens/EnrollmentInfoScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={WelcomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="EarlyRegistration"
          component={EarlyRegistrationScreen}
          options={{ title: "Early Registration" }}
        />
        <Stack.Screen
          name="EarlyRegistrationInfo"
          component={EarlyRegistrationInfoScreen}
          options={{ title: "Early Registration Info." }}
        />
        <Stack.Screen
          name="LRNValidator"
          component={LRNValidator}
          options={{ title: "LRN Validator" }}
        />
        <Stack.Screen
          name="EnrollmentInfo"
          component={EnrollmentInfoScreen}
          options={{ title: "Enrollment Info." }}
        />
        <Stack.Screen
          name="Enrollment"
          component={EnrollmentScreen}
          options={{ title: "Enrollment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
