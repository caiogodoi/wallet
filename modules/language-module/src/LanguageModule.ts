import { NativeModule, requireNativeModule } from "expo";

import { LanguageModuleEvents } from "./LanguageModule.types";

declare class LanguageModule extends NativeModule<LanguageModuleEvents> {
  getLanguage(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<LanguageModule>("LanguageModule");
