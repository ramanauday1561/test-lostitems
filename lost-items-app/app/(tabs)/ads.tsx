import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { AD_CAMPAIGNS, compact, ctr, money } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function AdsScreen() {
  const [ads, setAds] = useState(AD_CAMPAIGNS);
  const revenue = money(ads.reduce((s, a) => s + a.revenue, 0));

  const toggle = (code: string) =>
    setAds((xs) => xs.map((a) => (a.short_code === code ? { ...a, is_live: !a.is_live } : a)));

  return (
    <ScrollView>
      <View className="gap-3 px-5 pb-8">
        {/* Inverse revenue panel — accent-on-dark is DESIGN.md sec.2's #00E39B */}
        <View className="rounded-panel bg-panel p-5" style={{ boxShadow: SHADOW.darkPanel }}>
          <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-[rgba(255,255,255,0.5)]">
            Revenue this month
          </Text>
          <View className="mt-3 flex-row items-baseline gap-2.5">
            <Text className="font-sans-xb text-[44px] leading-[46px] tracking-[-2.2px] text-accent-dark">
              {revenue}
            </Text>
            <Text className="font-sans-md text-[12.5px] text-ink-muted">+18% vs last month</Text>
          </View>
        </View>

        {ads.map((a) => (
          <View key={a.short_code} className="rounded-panel bg-surface p-4" style={{ boxShadow: SHADOW.raised }}>
            <View className="flex-row items-center gap-3">
              <View className="h-11 w-11 flex-none items-center justify-center rounded-chip bg-primary/10">
                <Icon name={a.icon} size={22} color="#0B6BCB" />
              </View>
              <View className="min-w-0 flex-1">
                <Text numberOfLines={1} className="font-sans-bold text-[14.5px] tracking-[-0.2px] text-ink">
                  {a.campaign_name}
                </Text>
                <Text className="mt-[3px] font-sans-md text-[11.5px] text-ink-soft">
                  {a.advertiser_name} · {a.size}
                </Text>
              </View>
              <Text
                className={`rounded-full px-[11px] py-[6px] font-sans-bold text-[11px] ${a.is_live ? 'bg-success/10 text-success' : 'bg-ink-muted/10 text-ink-muted'}`}>
                {a.is_live ? 'Live' : 'Ended'}
              </Text>
            </View>

            <Text className="mt-3 font-mono text-[10.5px] tracking-[0.4px] text-ink-faintest">
              {a.short_code} · {a.slot_description}
            </Text>

            <View className="mt-3 flex-row gap-2">
              {[
                { label: 'Impressions', value: compact(a.impressions) },
                { label: 'CTR', value: `${ctr(a)}%` },
                { label: 'Revenue', value: money(a.revenue) },
                { label: 'Days left', value: String(a.days_left) },
              ].map((s) => (
                <View key={s.label} className="flex-1 items-center rounded-chip bg-subtle py-2.5">
                  <Text className="font-sans-xb text-[14px] tracking-[-0.3px] text-ink">{s.value}</Text>
                  <Text className="mt-0.5 text-center font-sans-sb text-[9.5px] text-ink-soft">{s.label}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() => toggle(a.short_code)}
              accessibilityRole="button"
              className="mt-2.5 min-h-[48px] items-center justify-center rounded-chip bg-subtle active:scale-[.97]">
              <Text className="font-sans-bold text-[13.5px] text-ink">
                {a.is_live ? 'Pause on this screen' : a.days_left <= 0 ? 'Relaunch' : 'Set live'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
