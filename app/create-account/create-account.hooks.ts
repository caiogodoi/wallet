import { setToStorage } from "../../utils/storage";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { router } from "expo-router";

const useCreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const isFullName = (name: string) => name.trim().split(" ").length > 1;
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPin = pin.every((digit) => digit !== "");

  const isFormValid = isFullName(name) && isValidEmail(email) && isValidPin;

  const handlePinChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text && index < inputs.length - 1) {
        inputs[index + 1].current?.focus();
      }
    }
  };

  const onSubmit = async () => {
    await setToStorage("userData", { name, email, pin: pin.join("") });
    router.replace("/login");
  };

  return {
    name,
    setName,
    email,
    setEmail,
    pin,
    setPin,
    inputs,
    isFullName,
    isValidEmail,
    isValidPin,
    isFormValid,
    handlePinChange,
    onSubmit,
  };
};

export default useCreateAccount;
