import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import useCreateAccount from "./create-account.hooks";
import styles from "./create-account.styles";
// @ts-ignore next-line
import SpaceImage from "../../assets/images/space.jpg";
export default function CreateAccountScreen() {
  const {
    name,
    setName,
    email,
    setEmail,
    pin,
    inputs,
    isFullName,
    isValidEmail,
    isValidPin,
    isFormValid,
    handlePinChange,
    onSubmit,
  } = useCreateAccount();

  return (
    <ImageBackground source={SpaceImage} style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      {!isFullName(name) && name.length > 0 && (
        <Text style={styles.errorText}>Please enter your full name</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {!isValidEmail(email) && email.length > 0 && (
        <Text style={styles.errorText}>Invalid email format</Text>
      )}

      <Text style={styles.pinTitle}>Enter your 4-digit PIN</Text>

      <View style={styles.pinContainer}>
        {pin.map((_, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            value={pin[index]}
            onChangeText={(text) => handlePinChange(text, index)}
          />
        ))}
      </View>
      {!isValidPin && (
        <Text style={styles.errorText}>PIN must be 4 digits</Text>
      )}

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
