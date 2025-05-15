import Colors from "@/constant/Colors";
import { Platform, StatusBar, StyleSheet } from "react-native";

export const Indexstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heroContainer: {
    width: "100%",
    position: "relative",
    height:250,
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