import React from "react";
import { Modal as RNModal, View, Text, TouchableOpacity } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import styles from "./Modal.styles";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

function AlertModal({ visible, onClose }: ModalProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor }]}>
          <Text style={[styles.title, { color: textColor }]}>
            PIN Incorreto
          </Text>
          <Text style={[styles.message, { color: textColor }]}>
            O PIN digitado não está correto. Por favor, tente novamente.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: tintColor }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
}

export default AlertModal;
