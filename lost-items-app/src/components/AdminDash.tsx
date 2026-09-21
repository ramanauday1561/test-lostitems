import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AD_CAMPAIGNS, CONVERSATIONS, FOUND_ITEMS, LOST_ITEMS, MODERATION_FLAGS, SCOUTS, money } from '../data/mockData';
import { SHADOW } from '../design';
import { Icon } from './Icon';

export const AdminDash = () => {
  const revenue = money(AD_CAMPAIGNS.reduce((s, a) => s + a.revenue, 0));
  const live = AD_CAMPAIGNS.filter((a) => a.is_live).length;
  const pending = MODERATION_FLAGS.length;
  const activeLost = LOST_ITEMS.filter((i) => i.status === 'active').length;
  const resolvedItems = [...FOUND_ITEMS, ...LOST_ITEMS].filter((i) => i.status === 'resolved').length;

  return (
    <ScrollView>
      <View className="gap-4 px-5 pb-8 pt-3">
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => router.navigate('/lost')}
            accessibilityRole="button"
            className="min-h-[76px] flex-1 flex-row items-center gap-2 rounded-panel bg-surface px-3 active:scale-[.985]"
            style={{ boxShadow: SHADOW.prominent }}>
            <View className="h-10 w-10 flex-none items-center justify-center rounded-chip bg-primary/10">
              <Icon name="help" size={20} color="#0B6BCB" />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="font-sans-bold text-[13px] text-ink">Active</Text>
              <Text className="mt-[3px] font-sans-xb text-[18px] text-primary">{activeLost}</Text>
              <Text className="font-sans-md text-[10px] text-ink-soft">Lost reports</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.navigate('/found')}
            accessibilityRole="button"
            className="min-h-[76px] flex-1 flex-row items-center gap-2 rounded-panel bg-surface px-3 active:scale-[.985]"
            style={{ boxShadow: SHADOW.prominent }}>
            <View className="h-10 w-10 flex-none items-center justify-center rounded-chip bg-success/10">
              <Icon name="check_circle" size={20} color="#0F7B3D" />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="font-sans-bold text-[13px] text-ink">Resolved</Text>
              <Text className="mt-[3px] font-sans-xb text-[18px]" style={{ color: '#0F7B3D' }}>{resolvedItems}</Text>
              <Text className="font-sans-md text-[10px] text-ink-soft">Items reunited</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.navigate('/ads')}
          accessibilityRole="button"
          className="min-h-[76px] flex-row items-center gap-[14px] rounded-panel bg-surface px-[18px] active:scale-[.985]"
          style={{ boxShadow: SHADOW.prominent }}>
          <View className="h-11 w-11 flex-none items-center justify-center rounded-chip bg-success/10">
            <Icon name="payments" size={23} color="#0F7B3D" />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">
              Ad placements &amp; revenue
            </Text>
            <Text className="mt-[3px] font-sans-md text-[12px] text-ink-soft">
              {revenue} this month · {live} live
            </Text>
          </View>
          <Icon name="chevron_right" size={21} color="#c6c9ce" />
        </Pressable>

        {/* Inverse panel — DESIGN.md sec.2 */}
        <View className="rounded-panel bg-panel p-5" style={{ boxShadow: SHADOW.darkPanel }}>
          <View className="flex-row items-center gap-2">
            <Icon name="flag" size={16} color="#FF8A80" />
            <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-[rgba(255,255,255,0.5)]">
              Needs moderation
            </Text>
          </View>
          <View className="mt-3.5 flex-row items-end justify-between gap-3">
            <View className="min-w-0 flex-1">
              <Text className="font-sans-xb text-[44px] leading-[46px] tracking-[-2.2px] text-surface">
                {pending}
              </Text>
              <Text className="mt-1 font-sans-md text-[12.5px] text-[rgba(255,255,255,0.55)]">
                flagged posts
              </Text>
            </View>
            <Pressable
              onPress={() => router.navigate('/moderation')}
              accessibilityRole="button"
              className="min-h-[48px] items-center justify-center rounded-chip bg-[rgba(255,255,255,0.1)] px-5 active:scale-[.97]">
              <Text className="font-sans-bold text-[13.5px] text-surface">Review</Text>
            </Pressable>
          </View>
        </View>

        <View className="rounded-panel bg-surface p-5" style={{ boxShadow: SHADOW.prominent }}>
          <Text className="font-sans-xb text-[16px] tracking-[-0.32px] text-ink">857 new scouts today</Text>
          <Text className="mb-4 mt-1.5 font-sans text-[12.5px] leading-[19.4px] text-ink-soft">
            Send a welcome message to everyone joining the recovery network.
          </Text>
          <View className="flex-row items-center gap-2">
            {SCOUTS.map((ini) => (
              <LinearGradient
                key={ini}
                colors={['#F4F4F2', '#E7E7E3']}
                start={{ x: 0.25, y: 0 }}
                end={{ x: 0.75, y: 1 }}
                style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text className="font-mono text-[11px] text-ink-muted">{ini}</Text>
              </LinearGradient>
            ))}
            <Pressable
              onPress={() => router.navigate('/members')}
              accessibilityRole="button"
              accessibilityLabel="Open members"
              className="h-11 w-11 items-center justify-center rounded-full bg-primary/10 active:scale-[.92]">
              <Icon name="arrow_forward" size={20} color="#0B6BCB" />
            </Pressable>
          </View>
        </View>

        {/* Conversation & Sentiment Section */}
        <View className="rounded-panel bg-surface p-5" style={{ boxShadow: SHADOW.prominent }}>
          <View className="flex-row items-center justify-between gap-3">
            <View className="min-w-0 flex-1">
              <Text className="font-sans-xb text-[16px] tracking-[-0.32px] text-ink">Conversation &amp; sentiment</Text>
              <Pressable
                onPress={() => router.navigate('/messages')}
                accessibilityRole="button"
                className="mt-2 self-start">
                <Text className="font-sans-bold text-[12px] text-primary">Open hub</Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-5 flex-row gap-3">
            <View className="min-w-0 flex-1 rounded-row bg-subtle px-3 py-3">
              <Text className="font-sans-xb text-[18px] text-ink">{CONVERSATIONS.length}</Text>
              <Text className="mt-1 font-sans-sb text-[10.5px] leading-[13px] text-ink-soft">
                Active threads
              </Text>
            </View>
            <View className="min-w-0 flex-1 rounded-row bg-subtle px-3 py-3">
              <Text className="font-sans-xb text-[18px]" style={{ color: '#0F7B3D' }}>94.2%</Text>
              <Text className="mt-1 font-sans-sb text-[10.5px] leading-[13px] text-ink-soft">
                Positive
              </Text>
            </View>
          </View>

          <View className="mt-4 flex-row items-center gap-2">
            <Text className="font-sans-md text-[11.5px] text-ink-soft">Avg response velocity</Text>
            <Text className="font-sans-bold text-[12px] text-primary">12.4 min</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.navigate('/analysis')}
          accessibilityRole="button"
          className="min-h-[76px] flex-row items-center gap-[14px] rounded-panel bg-surface px-[18px] active:scale-[.985]"
          style={{ boxShadow: SHADOW.raised }}>
          <View className="h-11 w-11 flex-none items-center justify-center rounded-chip bg-primary/10">
            <Icon name="insights" size={23} color="#0B6BCB" />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">Analysis</Text>
            <Text className="mt-[3px] font-sans-md text-[12px] text-ink-soft">
              Recovery rates and weekly activity
            </Text>
          </View>
          <Icon name="chevron_right" size={21} color="#c6c9ce" />
        </Pressable>
      </View>
    </ScrollView>
  );
};
