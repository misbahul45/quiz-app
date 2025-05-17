import Colors from "@/constant/Colors";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";


export default function RootLayout() {
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
  
    if (!fontsLoaded) {
      return null;
    }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Colors.background },
            headerShown:false
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
