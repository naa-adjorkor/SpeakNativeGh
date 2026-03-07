import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <>
      <Text style={styles.title}>SpeakNative Gh</Text>
      <Image source={require("../../assets/images/flag-icon.png")} style={styles.logo} />
      </>
      <Text style={styles.subTitle}>“Learn Ghanaian Languages with Confidence”</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#2E7D32",
  },
  logo: {
    width: 20,
    height: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "700"
  },
  subTitle: {
    fontSize: 16,
    color: "FFFFFF",
    fontWeight:"200",
  }
});