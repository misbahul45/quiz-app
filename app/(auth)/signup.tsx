import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { AuthSchema, SignupSchemaType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constant/Colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { authStyles } from '@/styles/auth.styles';
import { useAuthStore } from '@/store/useAuthStore';
import { sleep } from '@/libs/utils';

const Signup = () => {
    const signupFunction=useAuthStore((state)=>state.signup);
    const signupError = useAuthStore((state) => state.error);

    const router = useRouter();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<SignupSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(AuthSchema.signup),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit =async (data: SignupSchemaType) => {
        await sleep()
        await signupFunction(data);
        reset();
    };    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 30 }}
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
                    {signupError && <Text style={authStyles.errorText}>{signupError}</Text>}
                    <View style={authStyles.formContainer}>
                        <View style={{ marginBottom: 15 }}>
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
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                        />
                                    )}
                                />
                                <FontAwesome name="envelope" size={16} color={Colors.primaryDark} style={authStyles.inputIcon} />
                            </View>
                            {errors.email && <Text style={authStyles.errorText}>{errors.email.message}</Text>}
                        </View>

                        <View style={{ marginBottom: 15 }}>
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

                        <View style={{ marginBottom: 20 }}>
                            <View style={authStyles.inputContainer}>
                                <Controller
                                    control={control}
                                    name='confirmPassword'
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            placeholder="Confirm Password"
                                            placeholderTextColor={Colors.primaryDark}
                                            style={[
                                                authStyles.input, 
                                                errors.confirmPassword ? authStyles.inputError : null, 
                                                { paddingRight: 40 }
                                            ]}
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
                                        position: 'absolute',
                                        right: 10,
                                        top: Platform.OS === 'ios' ? 15 : 12,
                                        opacity: 0.5
                                    }}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                (!isValid || isSubmitting) && authStyles.signUpButtonDisabled
                            ]}
                            onPress={handleSubmit(onSubmit)}
                            activeOpacity={0.8}
                            disabled={!isValid}
                        >
                            <Text style={authStyles.signUpButtonText}>{isSubmitting? "Signing Up..." : "Sign Up"}</Text>
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
                        <TouchableOpacity onPress={() => router.push('/signin')}>
                            <Text style={authStyles.signInButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;