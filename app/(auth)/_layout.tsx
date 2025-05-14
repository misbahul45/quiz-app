import { StyleSheet, SafeAreaView, } from 'react-native'
import { Stack } from 'expo-router'
import Colors from '@/constant/Colors'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync()

export default function AuthLayout() {

  // Load fonts
  const [fontsLoaded] = useFonts({
    'outfit': require('../../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../../assets/fonts/Outfit-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="verification" />
      </Stack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.background,
    paddingLeft:10,
    paddingRight:10
  },
});