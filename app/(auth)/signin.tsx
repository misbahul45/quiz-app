import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { AuthSchema, SigninSchemaType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Colors from '@/constant/Colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { authStyles } from '@/styles/auth.styles';

const Signin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SigninSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthSchema.signin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SigninSchemaType) => {
    console.log(data);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}
      >
        <ScrollView
          style={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.logoContainer}>
            <Image
              source={require('@/assets/images/logo-1.png')}
              style={authStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={authStyles.title}>Welcome Back</Text>
          <Text style={authStyles.subTitle}>Sign in to continue</Text>

          <View style={authStyles.formContainer}>
            {/* Email */}
            <View>
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

            {/* Password */}
            <View>
              <View style={authStyles.inputContainer}>
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={Colors.primaryDark}
                      style={[authStyles.input, errors.password ? authStyles.inputError : null, { paddingRight: 20 }]}
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
                    top: '50%',
                    transform: [{ translateY: -10 }],
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
              disabled={!isValid}
            >
              <Text style={authStyles.signUpButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.signInContainer}>
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
