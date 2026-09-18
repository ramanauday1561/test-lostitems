import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { dashStats } from '../data/mockData';
import { SHADOW } from '../design';
import { Icon } from './Icon';

/** New account: nothing posted yet, so the dashboard is a setup checklist. */
const STEPS = [
  { icon: 'shield', title: 'Read the safe meetup rules', desc: 'Two minutes. It keeps handovers safe.', href: '/guidelines' },
  { icon: 'post_add', title: 'Report your first item', desc: 'Lost or found — it takes about 30 seconds.', href: '/report' },
  { icon: 'forum', title: 'Say hello in the forum', desc: 'Ask a question or share a sighting.', href: '/forum' },
] as const;

export const FreshDash = () => {
  const stats = dashStats('new');
  return (
    <ScrollView>
      <View className="gap-6 px-5 pb-8">
        <View className="rounded-panel bg-primary/[0.07] p-5">
          <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-primary">Welcome aboard</Text>
          <Text className="mt-2 font-sans-xb text-[22px] leading-[25px] tracking-[-0.66px] text-ink">
            Three steps to get going
          </Text>
          <Text className="mt-2 font-sans text-[13px] leading-[20px] text-ink-muted">
            Your account is live. Finish these and the community can start helping.
          </Text>
        </View>

        <View className="flex-row gap-2">
          {stats.map((s) => (
            <View
              key={s.label}
              className="flex-1 items-center rounded-card bg-surface px-2 py-4"
              style={{ boxShadow: '0 1px 2px rgba(22,24,31,.05), 0 10px 24px -18px rgba(22,24,31,.3)' }}>
              <Text className="font-sans-xb text-[24px] tracking-[-0.96px]" style={{ color: s.color }}>{s.value}</Text>
              <Text className="mt-1 text-center font-sans-sb text-[10.5px] leading-[13.6px] text-ink-soft">{s.label}</Text>
            </View>
          ))}
        </View>

        <View className="gap-2">
          {STEPS.map((c) => (
            <Pressable
              key={c.title}
              onPress={() => router.push(c.href as never)}
              accessibilityRole="button"
              className="min-h-[76px] flex-row items-center gap-[14px] rounded-[24px] bg-surface p-4 active:scale-[.985]"
              style={{ boxShadow: SHADOW.raised }}>
              <View className="h-[34px] w-[34px] flex-none items-center justify-center rounded-chip bg-primary/10">
                <Icon name="radio_button_unchecked" size={19} color="#0B6BCB" />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">{c.title}</Text>
                <Text className="mt-[3px] font-sans text-[12px] leading-[17.4px] text-ink-soft">{c.desc}</Text>
              </View>
              <Icon name="chevron_right" size={22} color="#c6c9ce" />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
