import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/constant/Colors';

type ButtonProps = {
  variant?: 'primary' | 'outline';
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
};

const Button = ({
  variant = 'primary',
  onPress,
  disabled = false,
  fullWidth = false,
  size = 'medium', 
  children,
}: ButtonProps) => {
  const getButtonStyles = () => {
    if (variant === 'outline') {
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
      };
    }
    // Default to primary style
    return {
      backgroundColor: disabled ? Colors.secondaryLight : Colors.primary,
      borderWidth: 0,
    };
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
        };
      case 'large':
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
        };
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        getSizeStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%'
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;