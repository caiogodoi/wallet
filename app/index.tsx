import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getFromStorage } from "../utils/storage";
import * as Linking from "expo-linking";

const Index: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fakeCheck = async (): Promise<string | null> => {
    const url = Linking.useURL();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const checkDeepLink = async (): Promise<void> => {
        const url = Linking.useURL();
        const userData = await getFromStorage("userData");
        const hasToken = userData?.token;

        if (!url) return;

        const { path, queryParams } = Linking.parse(url);

        if (path === "/login" || path === "/create-account") {
          router.replace(path);
          return;
        }

        if (hasToken) {
          if (path === "/home") {
            router.replace("/home");
            return;
          }

          if (path === "/transaction" && queryParams?.id) {
            router.replace({
              pathname: "/transaction",
              params: { id: queryParams.id },
            });
            return;
          }
        }

        router.replace("/login");
      };

      try {
        const url = Linking.useURL();
        console.log(url);

        if (url) {
          await checkDeepLink();
        }

        await fakeCheck();
        const user = await getFromStorage("userData");
        if (user) {
          router.replace("/login");
        } else {
          router.replace("/create-account");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.replace("/create-account");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
