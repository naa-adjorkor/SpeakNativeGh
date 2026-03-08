import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "../../styles/authStyles";
import Button, {btnStyles} from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={authStyles.container}>

      {/* Title */}
      <Text style={authStyles.title}>Welcome Back</Text>
      <Text style={authStyles.subtitle}>Login to continue learning journey</Text>

      {/* Email */}
      <Text style={authStyles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={authStyles.input}
      />

      {/* Password label row */}
      <View style={authStyles.passwordRow}>
        <Text style={authStyles.label}>Password</Text>
        <TouchableOpacity>
          <Text style={authStyles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Password input */}
      <View style={authStyles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={secureText}
          style={authStyles.passwordInput}
        />

        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#9E9E9E"
          />
        </TouchableOpacity>
      </View>

      {/* Login button */}
      <>
        <Button
          title="Login"
          onPress={() => navigation.navigate("Home")}
        />
      </>

      {/* OR divider */}
      <View style={authStyles.orContainer}>
        <View style={authStyles.line}/>
        <Text style={authStyles.or}>or</Text>
        <View style={authStyles.line}/>
      </View>

      {/* Google button */}
      <>
        <Button
          title="Continue with Google"
          style={btnStyles.secBtn}
          textStyle={btnStyles.secBtnText}
          onPress={() => navigation.navigate("#")}
        />
      </>

      {/* Bottom text */}
      <Text style={authStyles.signupText}>
        Don't have an account?{' '}
        <Text style={authStyles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>

    </View>
  );
}