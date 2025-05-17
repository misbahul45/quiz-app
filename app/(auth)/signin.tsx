import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { AuthSchema, SigninSchemaType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constant/Colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { authStyles } from '@/styles/auth.styles';
import { sleep } from '@/libs/utils';
import { useAuthStore } from '@/store/useAuthStore';

const Signin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const signinFunction = useAuthStore((state) => state.signin);
  const signinError = useAuthStore((state) => state.error);

  const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<SigninSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthSchema.signin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async(data: SigninSchemaType) => {
    await sleep()
    await signinFunction(data);
    reset()
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[authStyles.logoContainer, { marginTop: 20 }]}>
            <Image
              source={require('@/assets/images/logo-1.png')}
              style={authStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={authStyles.title}>Welcome Back</Text>
          <Text style={authStyles.subTitle}>Sign in to continue</Text>
          {signinError && <Text style={authStyles.errorText}>{signinError}</Text>}
          <View style={[authStyles.formContainer, { marginTop: 20 }]}>
            <View style={{ marginBottom: 15 }}>
              <View style={authStyles.inputContainer}>
                <Controller
                  control={control}
                  name='email'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={Colors.primaryDark}
                      style={[authStyles.input, errors.email ? authStyles.inputError : null]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                <FontAwesome name="envelope" size={16} color={Colors.primaryDark} style={authStyles.inputIcon} />
              </View>
              {errors.email && <Text style={authStyles.errorText}>{errors.email.message}</Text>}
            </View>


            <View style={{ marginBottom: 20 }}>
              <View style={authStyles.inputContainer}>
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={Colors.primaryDark}
                      style={[authStyles.input, errors.password ? authStyles.inputError : null, { paddingRight: 40 }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showPassword}
                    />
                  )}
                />
                <FontAwesome name="lock" size={16} color={Colors.primaryDark} style={authStyles.inputIcon} />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: Platform.OS === 'ios' ? 15 : 12,
                    opacity: 0.5
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color={Colors.primaryDark}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={authStyles.errorText}>{errors.password.message}</Text>}
            </View>

            <TouchableOpacity
              style={[
                authStyles.signUpButton,
                !isValid && authStyles.signUpButtonDisabled
              ]}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
              disabled={!isValid || isSubmitting}
            >
              <Text style={[authStyles.signUpButtonText, { opacity: isSubmitting ? 0.5 : 1 }]}>
                {isSubmitting ? 'loading...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[authStyles.signInContainer, { marginTop: 20 }]}>
            <Text style={authStyles.signInText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={authStyles.signInButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;