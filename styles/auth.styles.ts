import Colors from "@/constant/Colors";
import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: Colors.text,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 28,
    fontFamily: 'outfit-medium',
    textAlign: 'center',
    color: Colors.text + '70',
  },
  formContainer: {
    gap: 20,
    marginBottom: 30,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingLeft: 36,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
    fontFamily: 'outfit',
    borderColor: Colors.primaryDark,
    borderWidth: 2,
    shadowColor: Colors.primaryDark,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -8 }],
    opacity: 0.5,
  },
  inputError: {
    borderColor: '#FF5858',
  },
  errorText: {
    color: '#FF5858',
    fontSize: 12,
    fontFamily: 'outfit',
    marginTop: 4,
    marginLeft: 8,
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonDisabled: {
    backgroundColor: Colors.primary + '80',
    shadowOpacity: 0,
    elevation: 0,
  },
  signUpButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontFamily: 'outfit-bold',
  },
  termsContainer: {
    marginTop: 16,
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  termsText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontFamily: 'outfit',
    lineHeight: 20,
    textAlign: 'center',
  },
  termsLink: {
    color: Colors.primary,
    fontFamily: 'outfit-medium',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signInText: {
    color: Colors.primaryDark,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  signInButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
});