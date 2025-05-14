import Colors from "@/constant/Colors";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function Index() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const goTo = (url:any) => {
    router.push(url);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" />
      <View style={styles.heroContainer}>
        <Image
          source={require("../assets/images/landing.png")}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", Colors.primaryDark]}
          style={styles.imageOverlay}
        />
      </View>

      <View style={styles.contentCard}>
        <Image
          source={require("../assets/images/logo-1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeTitle}>Welcome To Coaching App</Text>
        <Text style={styles.welcomeSubtitle}>Your personal wellness companion</Text>

        <Text style={styles.description}>
          Explore topics, answer quizzes, and boost your brainpower.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => goTo("/signup")} 
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => goTo("/signin")} 
            style={styles.secondaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heroContainer: {
    height: 360,
    width: "100%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  contentCard: {
    width: "100%",
    padding: 24,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  welcomeTitle: {
    color: Colors.text,
    fontFamily: "outfit-bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: Colors.primaryDark,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "outfit-medium",
  },
  description: {
    color: Colors.text,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 26,
    fontFamily: "outfit",
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  primaryButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "outfit-medium",
  },
  secondaryButton: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "outfit-medium",
  },
  footerText: {
    color: Colors.primaryDark,
    fontSize: 10,
    textAlign: "center",
    marginTop: 16,
    opacity: 0.7,
    fontFamily: "outfit",
  },
});