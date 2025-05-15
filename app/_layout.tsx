import Colors from "@/constant/Colors";
import { useMiddleware } from "@/hooks/useMiddleware";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useMiddleware()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
