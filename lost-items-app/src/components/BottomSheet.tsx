import { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, Pressable, ScrollView, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const SHEET_HEIGHT = screenHeight * 0.8;
const DRAG_THRESHOLD = 100;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/** Material Design bottom sheet with drag-to-dismiss. */
export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) {
          translateY.setValue(dy);
        }
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > DRAG_THRESHOLD || vy > 1) {
          Animated.timing(translateY, {
            toValue: SHEET_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, translateY]);

  if (!isOpen) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* Scrim overlay */}
      <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />

      {/* Bottom sheet */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SHEET_HEIGHT,
          transform: [{ translateY }],
        }}
        {...panResponder.panHandlers}>
        <View className="flex-1 rounded-t-[24px] bg-canvas">
          {/* Drag handle */}
          <View className="items-center pt-3 pb-1">
            <View className="h-1 w-12 rounded-full bg-ink-faint" />
          </View>

          {/* Content */}
          <ScrollView className="flex-1" contentContainerClassName="px-6 pb-8">
            {children}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};
