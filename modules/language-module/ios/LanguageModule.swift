import ExpoModulesCore

public class LanguageModule: Module {
    public func definition() -> ModuleDefinition {
        Name("LanguageModule")

        Function("getLanguage") { () -> String in
            return Locale.current.localizedString(forLanguageCode: Locale.current.languageCode ?? "en") ?? "Unknown"
        }
    }
}