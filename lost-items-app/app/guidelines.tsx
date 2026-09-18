import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { GUIDELINE_RULES } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function GuidelinesScreen() {
  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-row items-center px-5 pt-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
          <Icon name="arrow_back" size={22} color="#16181F" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-6 pb-8 pt-2">
        <Text className="font-mono text-[10px] uppercase tracking-[1.6px] text-primary">Before you meet</Text>
        <Text className="my-2.5 font-sans-xb text-[30px] leading-[34px] tracking-[-1.05px] text-ink">
          Safe meetup rules
        </Text>
        <Text className="font-sans text-[15px] leading-[24px] text-ink-muted">
          Two minutes of reading keeps every handover safe.
        </Text>

        <View className="mt-6 gap-2">
          {GUIDELINE_RULES.map((r) => (
            <View key={r.title} className="flex-row gap-3.5 rounded-[24px] bg-surface p-4" style={{ boxShadow: SHADOW.raised }}>
              <View className="h-11 w-11 flex-none items-center justify-center rounded-chip bg-primary/10">
                <Icon name={r.icon} size={23} color="#0B6BCB" />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">{r.title}</Text>
                <Text className="mt-1.5 font-sans text-[12.5px] leading-[19.5px] text-ink-muted">{r.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          className="mt-6 min-h-[56px] items-center justify-center rounded-btn bg-primary active:scale-[.98]"
          style={{ boxShadow: SHADOW.primaryButton }}>
          <Text className="font-sans-bold text-[15.5px] text-surface">Got it</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
