import { ScrollView, Text, View } from 'react-native';

import { ACTIVITY_BARS, AD_CAMPAIGNS, ITEMS, MEMBERS, compact, displayStatus } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function AnalysisScreen() {
  const reunited = ITEMS.filter((i) => displayStatus(i) === 'Reunited' || displayStatus(i) === 'Resolved').length;
  const rate = Math.round((reunited / ITEMS.length) * 100);
  const impressions = AD_CAMPAIGNS.reduce((s, a) => s + a.impressions, 0);
  const peak = Math.max(...ACTIVITY_BARS.map(([, v]) => v));

  const tiles = [
    { value: String(ITEMS.length), label: 'Records', color: '#16181F' },
    { value: `${rate}%`, label: 'Recovery rate', color: '#0F7B3D' },
    { value: String(MEMBERS.length), label: 'Members', color: '#0B6BCB' },
  ];

  const rows = [
    { label: 'Lost reports', value: String(ITEMS.filter((i) => i.kind === 'lost').length) },
    { label: 'Found reports', value: String(ITEMS.filter((i) => i.kind === 'found').length) },
    { label: 'Ad impressions', value: compact(impressions) },
    { label: 'Suspended members', value: String(MEMBERS.filter((m) => m.is_suspended).length) },
  ];

  return (
    <ScrollView>
      <View className="gap-6 px-5 pb-8">
        <View className="flex-row gap-2">
          {tiles.map((t) => (
            <View
              key={t.label}
              className="flex-1 items-center rounded-card bg-surface px-2 py-4"
              style={{ boxShadow: '0 1px 2px rgba(22,24,31,.05), 0 10px 24px -18px rgba(22,24,31,.3)' }}>
              <Text className="font-sans-xb text-[24px] tracking-[-0.96px]" style={{ color: t.color }}>{t.value}</Text>
              <Text className="mt-1 text-center font-sans-sb text-[10.5px] leading-[13.6px] text-ink-soft">{t.label}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text className="mb-3 font-sans-xb text-[18px] tracking-[-0.45px] text-ink">This week</Text>
          <View className="rounded-panel bg-surface p-5" style={{ boxShadow: SHADOW.raised }}>
            <View className="h-[140px] flex-row items-end gap-2">
              {ACTIVITY_BARS.map(([day, value], i) => (
                <View key={`${day}-${i}`} className="flex-1 items-center gap-2">
                  <View
                    className="w-full rounded-chip bg-primary"
                    style={{ height: Math.round((value / peak) * 108) }}
                    accessibilityLabel={`${day}: ${value}`}
                  />
                  <Text className="font-mono text-[10px] text-ink-faintest">{day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View>
          <Text className="mb-3 font-sans-xb text-[18px] tracking-[-0.45px] text-ink">Breakdown</Text>
          <View className="rounded-panel bg-surface px-4" style={{ boxShadow: SHADOW.raised }}>
            {rows.map((r, i) => (
              <View
                key={r.label}
                className={`min-h-[52px] flex-row items-center justify-between gap-3 ${i ? 'border-t border-divider' : ''}`}>
                <Text className="font-sans-md text-[14.5px] text-ink">{r.label}</Text>
                <Text className="font-sans-sb text-[13.5px] text-ink-soft">{r.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
