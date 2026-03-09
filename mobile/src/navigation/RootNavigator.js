import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";
import AuthRoute from "./AuthRoute";
import AppRoute from "./AppRoute";

export default function RootNavigator() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {isSignedIn ? <AppRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
}