import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { ITEMS, ME, dashStats, initials } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';
import { useSession } from '@/src/session';

const ROLE_LABEL = { admin: 'Super Admin', member: 'Simple User', new: 'New User' } as const;

export default function ProfileScreen() {
  const { session, signOut } = useSession();
  const role = session?.role ?? 'member';
  const stats = dashStats(role);
  const myPosts = ITEMS.filter((i) => i.reporter_username === ME);

  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-row items-center px-5 pt-5">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
          <Icon name="arrow_back" size={22} color="#16181F" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="gap-6 px-5 pb-8 pt-2">
        <View className="items-center">
          <LinearGradient
            colors={['#F4F4F2', '#E7E7E3']}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.75, y: 1 }}
            style={{ width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' }}>
            <Text className="font-mono text-[20px] text-ink-muted">
              {initials(session?.username ?? '?')}
            </Text>
          </LinearGradient>
          <Text className="mt-3 font-sans-xb text-[22px] tracking-[-0.66px] text-ink">
            {session?.username ?? 'Guest'}
          </Text>
          <Text className="mt-1 font-mono text-[10px] uppercase tracking-[1.4px] text-ink-faint">
            {ROLE_LABEL[role]}
          </Text>
        </View>

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

        <View>
          <Text className="mb-3 font-sans-xb text-[18px] tracking-[-0.45px] text-ink">My posts</Text>
          <View className="gap-2">
            {myPosts.map((i) => (
              <Pressable
                key={i.id}
                onPress={() => router.push(`/item/${i.short_code}`)}
                accessibilityRole="button"
                className="min-h-[60px] flex-row items-center gap-3 rounded-row bg-surface px-4 active:scale-[.985]"
                style={{ boxShadow: SHADOW.resting }}>
                <Icon name={i.icon} size={22} color="#9a9ea4" />
                <View className="min-w-0 flex-1">
                  <Text numberOfLines={1} className="font-sans-bold text-[14px] text-ink">{i.title}</Text>
                  <Text className="mt-0.5 font-mono text-[10px] text-ink-faintest">{i.short_code}</Text>
                </View>
                <Icon name="chevron_right" size={22} color="#c6c9ce" />
              </Pressable>
            ))}
            {myPosts.length === 0 && (
              <Text className="px-6 py-10 text-center font-sans-md text-[13.5px] text-ink-faintest">
                You haven&apos;t posted anything yet.
              </Text>
            )}
          </View>
        </View>

        <View className="gap-2">
          {[
            { icon: 'shield', label: 'Safe meetup rules', href: '/guidelines' },
            { icon: 'support_agent', label: 'Get help', href: '/support' },
          ].map((r) => (
            <Pressable
              key={r.href}
              onPress={() => router.push(r.href as never)}
              accessibilityRole="button"
              className="min-h-[56px] flex-row items-center gap-3 rounded-row bg-surface px-4 active:scale-[.985]"
              style={{ boxShadow: SHADOW.resting }}>
              <Icon name={r.icon} size={21} color="#0B6BCB" />
              <Text className="flex-1 font-sans-sb text-[14px] text-ink">{r.label}</Text>
              <Icon name="chevron_right" size={20} color="#c6c9ce" />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => { signOut(); router.replace('/welcome'); }}
          accessibilityRole="button"
          className="min-h-[56px] items-center justify-center rounded-btn bg-surface active:scale-[.98]"
          style={{ boxShadow: SHADOW.resting }}>
          <Text className="font-sans-bold text-[15.5px] text-danger">Sign out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
