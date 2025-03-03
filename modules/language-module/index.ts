import { requireNativeModule } from "expo-modules-core";

// Garante que o módulo nativo está sendo carregado corretamente
const LanguageModule = requireNativeModule("LanguageModule");

export function getLanguage(): string {
  return LanguageModule.getLanguage();
}
