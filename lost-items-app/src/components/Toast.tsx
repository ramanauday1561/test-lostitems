import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { Icon } from './Icon';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps extends ToastMessage {
  onDismiss: (id: string) => void;
}

const TOAST_COLORS: Record<ToastType, { bg: string; text: string; icon: string; iconColor: string }> = {
  success: { bg: 'bg-success/10', text: 'text-success', icon: 'check_circle', iconColor: '#0F7B3D' },
  error: { bg: 'bg-danger/10', text: 'text-danger', icon: 'error', iconColor: '#B42318' },
  info: { bg: 'bg-primary/10', text: 'text-primary', icon: 'info', iconColor: '#0B6BCB' },
  warning: { bg: 'bg-orange-500/10', text: 'text-orange-600', icon: 'warning', iconColor: '#EA580C' },
};

export const Toast = ({ id, message, type, duration = 3000, onDismiss }: ToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => onDismiss(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onDismiss, opacity, translateY]);

  const colors = TOAST_COLORS[type];

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}>
      <View className={`mx-4 flex-row items-center gap-3 rounded-row ${colors.bg} px-4 py-3`}>
        <Icon name={colors.icon} size={20} color={colors.iconColor} />
        <Text className={`flex-1 font-sans-md text-[13px] leading-[20px] ${colors.text}`}>
          {message}
        </Text>
        <Pressable
          onPress={() => onDismiss(id)}
          className="ml-2 h-6 w-6 items-center justify-center"
          accessibilityRole="button">
          <Icon name="close" size={18} color={colors.iconColor} />
        </Pressable>
      </View>
    </Animated.View>
  );
};
