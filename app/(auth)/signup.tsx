import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { AuthSchema, SignupSchemaType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Colors from '@/constant/Colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { authStyles } from '@/styles/auth.styles';

const Signup = () => {
      const router = useRouter();
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignupSchemaType>({
        mode:'onChange',
        resolver: zodResolver(AuthSchema.signup),
        defaultValues: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      })

      const onSubmit = (data: SignupSchemaType) => {
          console.log(data)
      }
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
                <Text style={authStyles.title}>Create new Account</Text>
                <Text style={authStyles.subTitle}>Signup to get started with us</Text>

                <View style={authStyles.formContainer}>
                    {/* Username */}
                    <View>
                        <View style={authStyles.inputContainer}>
                            <Controller
                                control={control}
                                name='username'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Username"
                                        placeholderTextColor={Colors.primaryDark}
                                        style={[authStyles.input, errors.username ? authStyles.inputError : null]}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            <FontAwesome name="user-o" size={16} color={Colors.primaryDark} style={authStyles.inputIcon} />
                        </View>
                        {errors.username && <Text style={authStyles.errorText}>{errors.username.message}</Text>}
                     </View>
                    
                    {/*Email*/}
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
                                        keyboardType='email-address'
                                        autoCapitalize='none'
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
                                style={[authStyles.input, errors.password ? authStyles.inputError : null]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                />
                            )}
                            />
                            <FontAwesome name="lock" size={16} color={Colors.primaryDark} style={authStyles.inputIcon} />
                        </View>
                        {errors.password && <Text style={authStyles.errorText}>{errors.password.message}</Text>}
                    </View>

                    {/* Confirm Password */}
                    <View>
                        <View style={authStyles.inputContainer}>
                            <Controller
                            control={control}
                            name='confirmPassword'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor={Colors.primaryDark}
                                style={[authStyles.input, errors.confirmPassword ? authStyles.inputError : null, { paddingRight:20 }]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!showConfirmPassword}
                                />
                            )}
                            />
                            <FontAwesome name="lock" size={16} color={Colors.primaryDark} style={authStyles.inputIcon} />
                            <TouchableOpacity
                                style={{
                                    position:'absolute',
                                    right:10,
                                    top: '50%',
                                    transform: [{ translateY: '-50%' }],
                                    opacity: 0.5
                                }}
                                onPress={()=>setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Feather 
                                    name={showConfirmPassword ? "eye" : "eye-off"} 
                                    size={20} 
                                    color={Colors.primaryDark} 
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text style={authStyles.errorText}>{errors.confirmPassword.message}</Text>}
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
                        <Text style={authStyles.signUpButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={authStyles.termsContainer}>
                    <Text style={authStyles.termsText}>
                        By signing up, you agree to our{' '}
                    <Text style={authStyles.termsLink}>Terms of Service</Text> and{' '}
                        <Text style={authStyles.termsLink}>Privacy Policy</Text>
                    </Text>
                </View>

                <View style={authStyles.signInContainer}>
                    <Text style={authStyles.signInText}>Already have an account? </Text>
                    <TouchableOpacity onPress={()=>router.push('/signin')}>
                        <Text style={authStyles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}




export default Signup