import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { MODERATION_FLAGS } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function ModerationScreen() {
  const [queue, setQueue] = useState(MODERATION_FLAGS);
  const decide = (code: string) => setQueue((q) => q.filter((f) => f.target_code !== code));

  return (
    <ScrollView>
      <View className="px-5 pb-8">
        <View className="mb-3 flex-row items-center justify-between gap-2">
          <Text className="font-sans-xb text-[18px] tracking-[-0.45px] text-ink">Flagged content</Text>
          <Text className="rounded-full bg-danger/10 px-3 py-1.5 font-sans-bold text-[11px] text-danger">
            {queue.length} pending
          </Text>
        </View>

        <View className="gap-2">
          {queue.map((f) => (
            <View key={f.target_code} className="rounded-[24px] bg-surface p-4" style={{ boxShadow: SHADOW.raised }}>
              <View className="flex-row items-center justify-between gap-2">
                <Text className="font-mono text-[10.5px] tracking-[0.4px] text-ink-soft">{f.target_code}</Text>
                <Text className="rounded-full bg-danger/10 px-2.5 py-[5px] font-sans-sb text-[10.5px] text-danger">
                  {f.reason}
                </Text>
              </View>
              <Text className="mt-2.5 font-sans-bold text-[15px] leading-[19.5px] tracking-[-0.225px] text-ink">
                {f.title}
              </Text>
              <Text className="mt-1 font-mono text-[12px] text-ink-soft">
                {f.author_username} · {f.category}
              </Text>
              <View className="mt-3.5 flex-row gap-2">
                <Pressable
                  onPress={() => decide(f.target_code)}
                  accessibilityRole="button"
                  className="min-h-[44px] flex-1 items-center justify-center rounded-chip bg-success/10 active:scale-[.97]">
                  <Text className="font-sans-bold text-[13.5px] text-success">Approve</Text>
                </Pressable>
                <Pressable
                  onPress={() => decide(f.target_code)}
                  accessibilityRole="button"
                  className="min-h-[44px] flex-1 items-center justify-center rounded-chip bg-danger/10 active:scale-[.97]">
                  <Text className="font-sans-bold text-[13.5px] text-danger">Remove</Text>
                </Pressable>
              </View>
            </View>
          ))}

          {queue.length === 0 && (
            <View className="items-center rounded-[24px] bg-surface px-6 py-10" style={{ boxShadow: SHADOW.resting }}>
              <View className="h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <Icon name="task_alt" size={26} color="#0F7B3D" />
              </View>
              <Text className="mt-3.5 font-sans-bold text-[14px] text-ink">Queue clear</Text>
              <Text className="mt-1 font-sans text-[12.5px] text-ink-soft">
                No flagged content pending review.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
