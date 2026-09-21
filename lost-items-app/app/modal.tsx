import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { BottomSheet } from '@/src/components/BottomSheet';
import { Icon } from '@/src/components/Icon';
import { initials } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

/** User profile overlay shown as a Material Design bottom sheet. */
export default function UserOverlayModal() {
  const { username } = useLocalSearchParams<{ username?: string }>();
  const displayName = username || 'User Profile';

  return (
    <BottomSheet isOpen onClose={() => router.back()}>
      {/* User header */}
      <View className="items-center mt-2">
        <LinearGradient
          colors={['#F4F4F2', '#E7E7E3']}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 0.75, y: 1 }}
          style={{ width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="font-mono text-[18px] text-ink-muted">
            {initials(displayName)}
          </Text>
        </LinearGradient>
        <Text className="mt-3 font-sans-xb text-[20px] tracking-[-0.6px] text-ink">
          {displayName}
        </Text>
        <Text className="mt-1 font-sans-md text-[12px] text-ink-soft">
          Community Member
        </Text>
      </View>

      {/* Stats */}
      <View className="mt-6 flex-row gap-2">
        <View className="flex-1 items-center rounded-card bg-surface px-2 py-4" style={{ boxShadow: SHADOW.raised }}>
          <Text className="font-sans-xb text-[20px] text-primary">12</Text>
          <Text className="mt-1 text-center font-sans-sb text-[10.5px] leading-[13.6px] text-ink-soft">
            Items found
          </Text>
        </View>
        <View className="flex-1 items-center rounded-card bg-surface px-2 py-4" style={{ boxShadow: SHADOW.raised }}>
          <Text className="font-sans-xb text-[20px]" style={{ color: '#0F7B3D' }}>8</Text>
          <Text className="mt-1 text-center font-sans-sb text-[10.5px] leading-[13.6px] text-ink-soft">
            Reunited
          </Text>
        </View>
        <View className="flex-1 items-center rounded-card bg-surface px-2 py-4" style={{ boxShadow: SHADOW.raised }}>
          <Text className="font-sans-xb text-[20px]" style={{ color: '#6B7280' }}>4</Text>
          <Text className="mt-1 text-center font-sans-sb text-[10.5px] leading-[13.6px] text-ink-soft">
            Reports
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View className="mt-6 gap-2">
        <Pressable
          onPress={() => {
            router.back();
            router.push(`/messages/msg-${displayName.toLowerCase().replace(/\s+/g, '-')}`);
          }}
          accessibilityRole="button"
          className="min-h-[52px] flex-row items-center gap-3 rounded-row bg-surface px-4 active:scale-[.985]"
          style={{ boxShadow: SHADOW.resting }}>
          <Icon name="chat" size={20} color="#0B6BCB" />
          <Text className="flex-1 font-sans-sb text-[14px] text-ink">Send message</Text>
          <Icon name="chevron_right" size={20} color="#c6c9ce" />
        </Pressable>

        <Pressable
          onPress={() => {
            router.back();
            router.push('/profile');
          }}
          accessibilityRole="button"
          className="min-h-[52px] flex-row items-center gap-3 rounded-row bg-surface px-4 active:scale-[.985]"
          style={{ boxShadow: SHADOW.resting }}>
          <Icon name="person" size={20} color="#6B7280" />
          <Text className="flex-1 font-sans-sb text-[14px] text-ink">View profile</Text>
          <Icon name="chevron_right" size={20} color="#c6c9ce" />
        </Pressable>

        <Pressable
          onPress={() => {
            router.back();
            router.push('/report');
          }}
          accessibilityRole="button"
          className="min-h-[52px] flex-row items-center gap-3 rounded-row bg-surface px-4 active:scale-[.985]"
          style={{ boxShadow: SHADOW.resting }}>
          <Icon name="flag" size={20} color="#B42318" />
          <Text className="flex-1 font-sans-sb text-[14px] text-ink">Report member</Text>
          <Icon name="chevron_right" size={20} color="#c6c9ce" />
        </Pressable>
      </View>

      {/* Close button */}
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        className="mt-4 min-h-[52px] items-center justify-center rounded-btn bg-surface active:scale-[.98]"
        style={{ boxShadow: SHADOW.resting }}>
        <Text className="font-sans-bold text-[14px] text-ink">Close</Text>
      </Pressable>
    </BottomSheet>
  );
}
