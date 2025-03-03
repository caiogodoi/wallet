import React from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// @ts-ignore next-line
import SpaceImage from "../../assets/images/space.jpg";
import useLogin from "./login.hooks";
import styles from "./login.styles";
import Modal from "~/components/Modal";

export default function LoginScreen() {
  const {
    pin,
    inputs,
    modalVisible,
    handleChange,
    handleKeyPress,
    onSubmit,
    setModalVisible,
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
    >
      <ImageBackground source={SpaceImage} style={styles.background}>
        <Text style={styles.title}>Type your PIN</Text>
        <View style={styles.inputContainer}>
          {pin.map((_, index) => (
            <TextInput
              key={index}
              ref={inputs[index]}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={pin[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
