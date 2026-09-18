import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import {
  COMMUNITY_COMMENTS, FOUND_ITEMS, SHORTCUTS, dashStats, displayStatus, formatDate, unreadTotal,
} from '@/src/data/mockData';
import { SHADOW, STATUS_HEX } from '@/src/design';
import { AdminDash } from '@/src/components/AdminDash';
import { FreshDash } from '@/src/components/FreshDash';
import { useSession } from '@/src/session';

export default function DashboardScreen() {
  const { session } = useSession();
  const role = session?.role ?? 'member';
  // The prototype shows three different dashboards behind one "Home" tab.
  if (role === 'admin') return <AdminDash />;
  if (role === 'new') return <FreshDash />;
  const stats = dashStats(role);
  const handedIn = FOUND_ITEMS.slice(0, 5);
  const unread = unreadTotal();

  return (
    <ScrollView>
      <View className="gap-6 px-5 pb-8">
        {/* Search entry */}
        <Pressable
          onPress={() => router.navigate('/found')}
          accessibilityRole="button"
          className="min-h-[52px] flex-row items-center gap-3 rounded-panel bg-surface py-0 pl-[18px] pr-2 active:scale-[.99]"
          style={{ boxShadow: '0 1px 2px rgba(22,24,31,.05), 0 10px 24px -16px rgba(22,24,31,.3)' }}>
          <Icon name="search" size={21} color="#9a9ea4" />
          <Text className="flex-1 font-sans-md text-[14.5px] text-ink-faint">Search the registry</Text>
          <View className="h-9 w-9 items-center justify-center rounded-full bg-canvas">
            <Icon name="tune" size={19} color="#0B6BCB" />
          </View>
        </Pressable>

        {/* Stat tiles */}
        <View className="flex-row gap-2">
          {stats.map((s) => (
            <View
              key={s.label}
              className="flex-1 items-center rounded-card bg-surface px-2 py-4"
              style={{ boxShadow: '0 1px 2px rgba(22,24,31,.05), 0 10px 24px -18px rgba(22,24,31,.3)' }}>
              <Text className="font-sans-xb text-[24px] tracking-[-0.96px]" style={{ color: s.color }}>
                {s.value}
              </Text>
              <Text className="mt-1 text-center font-sans-sb text-[10.5px] leading-[13.6px] text-ink-soft">
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Recently handed in */}
        <View>
          <View className="mb-3 flex-row items-baseline justify-between gap-2">
            <Text className="font-sans-xb text-[18px] tracking-[-0.45px] text-ink">Recently handed in</Text>
            <Pressable onPress={() => router.navigate('/found')} accessibilityRole="button" className="min-h-[44px] justify-center pl-2">
              <Text className="font-sans-bold text-[12.5px] text-primary">See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5" contentContainerClassName="gap-3 px-5 pb-2 pt-1">
            {handedIn.map((it) => {
              const status = displayStatus(it);
              const hue = STATUS_HEX[status];
              return (
                <Pressable
                  key={it.id}
                  onPress={() => router.push(`/item/${it.short_code}`)}
                  accessibilityRole="button"
                  accessibilityLabel={`${it.title}, ${status}`}
                  className="w-[200px] flex-none rounded-panel bg-surface p-2 active:scale-[.97]"
                  style={{ boxShadow: '0 1px 2px rgba(22,24,31,.05), 0 16px 32px -20px rgba(22,24,31,.45)' }}>
                  <LinearGradient
                    colors={['#F4F4F2', '#E9E9E5']}
                    start={{ x: 0.25, y: 0 }}
                    end={{ x: 0.75, y: 1 }}
                    style={{ height: 124, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={it.icon} size={44} color="#b7bbc1" />
                    <View className="absolute right-2 top-2 rounded-full px-[9px] py-[5px]" style={{ backgroundColor: `${hue}1A` }}>
                      <Text className="font-sans-bold text-[10px]" style={{ color: hue }}>{status}</Text>
                    </View>
                  </LinearGradient>
                  <View className="px-2.5 pb-2.5 pt-3.5">
                    <Text numberOfLines={1} className="font-sans-bold text-[15px] leading-[18.75px] tracking-[-0.225px] text-ink">
                      {it.title}
                    </Text>
                    <View className="mt-1.5 flex-row items-center gap-[5px]">
                      <Icon name="location_on" size={15} color="#8b8f95" />
                      <Text numberOfLines={1} className="font-sans-md text-[11.5px] text-ink-soft">{it.location_text}</Text>
                    </View>
                    <Text className="mt-2 font-mono text-[10px] tracking-[0.4px] text-ink-faintest">
                      {it.short_code} · {formatDate(it.date_occurred)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => router.navigate('/found')}
              accessibilityRole="button"
              className="w-[132px] flex-none items-center justify-center gap-2.5 rounded-panel bg-primary/[0.07] active:scale-[.97]">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-surface" style={{ boxShadow: '0 4px 12px -4px rgba(11,107,203,.4)' }}>
                <Icon name="arrow_forward" size={22} color="#0B6BCB" />
              </View>
              <Text className="font-sans-bold text-[12.5px] text-primary">Browse all</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Shortcuts */}
        <View className="gap-2">
          {SHORTCUTS.map((c) => (
            <Pressable
              key={c.title}
              onPress={() => router.navigate(c.href as never)}
              accessibilityRole="button"
              className="min-h-[76px] flex-row items-center gap-[14px] rounded-[24px] bg-surface p-4 active:scale-[.985]"
              style={{ boxShadow: SHADOW.raised }}>
              <View className="h-11 w-11 flex-none items-center justify-center rounded-chip bg-primary/10">
                <Icon name={c.icon} size={23} color="#0B6BCB" />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">{c.title}</Text>
                <Text className="mt-[3px] font-sans text-[12px] leading-[17.4px] text-ink-soft">
                  {c.title === 'Messages' && unread
                    ? `${unread} unread from people returning your items.`
                    : c.desc}
                </Text>
              </View>
              <Icon name="chevron_right" size={22} color="#c6c9ce" />
            </Pressable>
          ))}
        </View>

        {/* Community */}
        <View>
          <Text className="mb-3 font-sans-xb text-[18px] tracking-[-0.45px] text-ink">Community</Text>
          <View className="gap-1 rounded-panel bg-surface p-2" style={{ boxShadow: SHADOW.raised }}>
            {COMMUNITY_COMMENTS.map((c) => (
              <View key={c.user} className="flex-row gap-3 p-3">
                <LinearGradient
                  colors={['#F4F4F2', '#E7E7E3']}
                  start={{ x: 0.25, y: 0 }}
                  end={{ x: 0.75, y: 1 }}
                  style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
                  <Text className="font-mono text-[11px] text-ink-muted">{c.ini}</Text>
                </LinearGradient>
                <View className="min-w-0 flex-1">
                  <View className="flex-row items-baseline justify-between gap-2">
                    <Text className="min-w-0 flex-1 font-sans-bold text-[12.5px] text-ink">
                      {c.user} <Text className="font-sans-md text-primary">on {c.onItem}</Text>
                    </Text>
                    <Text className="flex-none font-mono text-[10px] text-ink-faintest">{c.time}</Text>
                  </View>
                  <Text className="mt-1.5 font-sans text-[12.5px] leading-[20px] text-ink-muted">{c.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
