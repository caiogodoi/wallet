import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from "react-native";
import { getFromStorage } from "~/utils/storage";

import { useDispatch } from "react-redux";
import { setUserData } from "~/store/features/user/userSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text && index < inputs.length - 1) {
        inputs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const onSubmit = async () => {
    const userData = await getFromStorage("userData");
    if (pin.join("") === userData?.pin) {
      dispatch(
        setUserData({
          name: userData.name,
          email: userData.email,
        })
      );
      router.replace("/home");
    } else {
      setModalVisible(true);
    }
  };

  return {
    pin,
    inputs,
    modalVisible,
    handleChange,
    handleKeyPress,
    onSubmit,
    setModalVisible,
  };
};

export default useLogin;
