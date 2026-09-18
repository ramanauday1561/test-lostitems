import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { CONVERSATIONS } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function MessagesScreen() {
  return (
    <ScrollView>
      <View className="gap-2 px-5 pb-8">
        {CONVERSATIONS.map((c) => (
          <Pressable
            key={c.item_short_code}
            onPress={() => router.push(`/messages/${c.item_short_code}`)}
            accessibilityRole="button"
            accessibilityLabel={`${c.item_title} with ${c.with_username}${c.unread ? `, ${c.unread} unread` : ''}`}
            className="flex-row items-center gap-[14px] rounded-[24px] bg-surface p-3 active:scale-[.985]"
            style={{ boxShadow: SHADOW.raised }}>
            <LinearGradient
              colors={['#F4F4F2', '#E9E9E5']}
              start={{ x: 0.25, y: 0 }}
              end={{ x: 0.75, y: 1 }}
              style={{ width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={c.icon} size={24} color="#b7bbc1" />
            </LinearGradient>

            <View className="min-w-0 flex-1">
              <View className="flex-row items-baseline justify-between gap-2">
                <Text numberOfLines={1} className="min-w-0 flex-1 font-sans-bold text-[14.5px] tracking-[-0.2px] text-ink">
                  {c.item_title}
                </Text>
                <Text className="flex-none font-mono text-[10px] text-ink-faintest">{c.last_message_at}</Text>
              </View>
              <Text numberOfLines={1} className="mt-1 font-sans text-[12.5px] text-ink-soft">
                {c.messages[c.messages.length - 1]?.body}
              </Text>
              <Text className="mt-1 font-mono text-[10px] tracking-[0.4px] text-ink-faintest">
                {c.item_short_code} · {c.with_username}
              </Text>
            </View>

            {c.unread > 0 && (
              <View className="h-[22px] min-w-[22px] flex-none items-center justify-center rounded-full bg-primary px-1.5">
                <Text className="font-mono text-[11px] text-surface">{c.unread}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
