import { View } from 'react-native';

import { Toast } from './Toast';
import { useToast } from '@/src/context/ToastContext';

export const ToastContainer = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <View className="absolute top-0 left-0 right-0 z-50 pt-5 pointer-events-none">
      {toasts.map((toast) => (
        <View key={toast.id} className="pointer-events-auto mb-2">
          <Toast
            {...toast}
            onDismiss={dismissToast}
          />
        </View>
      ))}
    </View>
  );
};
