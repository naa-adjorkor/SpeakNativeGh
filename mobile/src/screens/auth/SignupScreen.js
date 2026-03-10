import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { authStyles } from "../../styles/authStyles";
import Button, { btnStyles } from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignupScreen({ navigation }) {

  const { signUp, setActive, isLoaded } = useSignUp();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError("");

      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);

    } catch (err) {
      setError(err?.errors?.[0]?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError("");

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });

      navigation.replace("Home");

    } catch (err) {
      setError(err?.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError("");

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/Home",
      });

    } catch (err) {
      setError(err?.errors?.[0]?.message || "Google sign in failed");
    }
  };

  const getPasswordStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  return (
    <View style={authStyles.container}>

      {/* Title */}
      <Text style={authStyles.title}>Create an Account</Text>

      <Text style={authStyles.subtitle}>
        Start learning Ghanaian languages today
      </Text>

      {error ? (
        <Text style={authStyles.errorText}>{error}</Text>
      ) : null}

      {!pendingVerification ? (
        <>
          {/* Full Name */}
          <Text style={authStyles.label}>Full Name</Text>

          <TextInput
            placeholder="Enter your name"
            style={authStyles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email */}
          <Text style={authStyles.label}>Email</Text>

          <TextInput
            placeholder="Enter your email"
            style={authStyles.input}
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={authStyles.label}>Password</Text>

          <View style={authStyles.passwordContainer}>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={secureText}
              style={authStyles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
            >
              <Ionicons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          </View>
            {password.length > 0 && (
            <Text style={authStyles.passwordStrength}>
              Strength: {getPasswordStrength()}
            </Text>
)}

          {/* Signup Button */}
          <Button
            title={loading ? "Creating account..." : "Sign Up"}
            onPress={handleSubmit}
          />

          {/* OR divider */}
          <View style={authStyles.orContainer}>
            <View style={authStyles.line}/>
            <Text style={authStyles.or}>or</Text>
            <View style={authStyles.line}/>
          </View>

          {/* Google Signup */}
          <TouchableOpacity
            style={btnStyles.secBtn}
            onPress={handleGoogleSignup}
          >

            <Image
              source={require("../../assets/images/google.png")}
              style={{
                width: 20,
                height: 20,
                marginRight: 10
              }}
              resizeMode="contain"
            />

            <Text style={btnStyles.secBtnText}>
              Continue with Google
            </Text>

          </TouchableOpacity>

        </>
      ) : (
        <>
          {/* Verification */}
          <Text style={authStyles.label}>
            Verification Code
          </Text>

          <TextInput
            placeholder="Enter code sent to your email"
            style={authStyles.input}
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />

          <Button
            title={loading ? "Verifying..." : "Verify Email"}
            onPress={handleVerify}
          />
        </>
      )}

      {/* Bottom text */}
      <Text style={authStyles.signupText}>
        Already have an account?{" "}
        <Text
          style={authStyles.signupLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>

    </View>
  );
}