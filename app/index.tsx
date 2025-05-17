import Colors from "@/constant/Colors";
import { useMiddleware } from "@/hooks/useMiddleware";
import { Indexstyles } from "@/styles/index.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  useMiddleware()
  const router = useRouter();

  const goTo = (url:any) => {
    router.push(url);
  };


  return (
    <SafeAreaView style={Indexstyles.container}>
      <StatusBar barStyle="light-content" />
      <View style={Indexstyles.heroContainer}>
        <Image
          source={require("../assets/images/landing.png")}
          style={Indexstyles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", Colors.primaryDark]}
          style={Indexstyles.imageOverlay}
        />
      </View>

      <View style={Indexstyles.contentCard}>
        <Image
          source={require("../assets/images/logo-1.png")}
          style={Indexstyles.logo}
          resizeMode="contain"
        />
        <Text style={Indexstyles.welcomeTitle}>Welcome To Coaching App</Text>
        <Text style={Indexstyles.welcomeSubtitle}>Your personal wellness companion</Text>

        <Text style={Indexstyles.description}>
          Explore topics, answer quizzes, and boost your brainpower.
        </Text>

        <View style={Indexstyles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => goTo("/signup")} 
            style={Indexstyles.primaryButton}
            activeOpacity={0.8}
          >
            <Text style={Indexstyles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => goTo("/signin")} 
            style={Indexstyles.secondaryButton}
            activeOpacity={0.8}
          >
            <Text style={Indexstyles.secondaryButtonText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>

        <Text style={Indexstyles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

