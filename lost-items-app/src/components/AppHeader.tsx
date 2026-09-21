import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { initials, unreadTotal } from '../data/mockData';
import { SHADOW } from '../design';
import { useSession } from '../session';
import { Icon } from './Icon';

/** Mono kicker over an 800/26px title, with inbox and avatar controls. */
export const AppHeader = ({ kicker, title }: { kicker: string; title: string }) => {
  const { session } = useSession();
  const unread = unreadTotal();

  return (
    <View className="flex-row items-center gap-3 px-5 pb-3 pt-5">
      <View className="min-w-0 flex-1">
        <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-faint">
          {kicker}
        </Text>
        <Text className="mt-1 font-sans-xb text-[26px] leading-[29px] tracking-[-0.78px] text-ink">
          {title}
        </Text>
      </View>

      <Pressable
        onPress={() => router.push('/messages')}
        accessibilityRole="button"
        accessibilityLabel={unread ? `Messages, ${unread} unread` : 'Messages'}
        className="h-11 w-11 flex-none items-center justify-center rounded-full bg-surface active:scale-[.94]"
        style={{ boxShadow: SHADOW.floating }}>
        <Icon name="chat" size={22} color="#16181F" />
        {unread > 0 && (
          <View className="absolute -right-0.5 -top-0.5 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1">
            <Text className="font-mono text-[10px] text-surface">{unread}</Text>
          </View>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push('/profile')}
        accessibilityRole="button"
        accessibilityLabel="Profile"
        className="h-11 w-11 flex-none items-center justify-center rounded-full bg-surface active:scale-[.94]"
        style={{ boxShadow: SHADOW.floating }}>
        <Text className="font-mono text-[12px] text-primary">
          {initials(session?.username ?? '?')}
        </Text>
      </Pressable>
    </View>
  );
};
