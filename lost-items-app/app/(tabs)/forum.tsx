import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { FORUM_THREADS, FORUM_TOPICS, initials } from '@/src/data/mockData';
import { SHADOW, SHADOW_PILL_OFF, SHADOW_PILL_ON, STATUS_HEX } from '@/src/design';
import { useSession } from '@/src/session';
import { useToast } from '@/src/context/ToastContext';

/** Tag chip hues: Sighting is the action blue, Reunited green, Question muted. */
const TAG_HEX: Record<string, string> = {
  sighting: '#0B6BCB',
  reunited: STATUS_HEX.Reunited,
  question: '#6B7280',
};
const TAG_LABEL: Record<string, string> = {
  sighting: 'Sighting',
  reunited: 'Reunited',
  question: 'Question',
};

export default function ForumScreen() {
  const { session } = useSession();
  const { showToast } = useToast();
  const [topic, setTopic] = useState<string>('All');
  const admin = session?.role === 'admin';

  const threads = useMemo(
    () => (topic === 'All' ? FORUM_THREADS : FORUM_THREADS.filter((t) => t.topic === topic)),
    [topic]
  );

  return (
    <ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-5 pb-1">
        {FORUM_TOPICS.map((t) => {
          const on = topic === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTopic(t)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              className={`min-h-[44px] shrink-0 items-center justify-center rounded-full px-[18px] active:scale-[.96] ${on ? 'bg-ink' : 'bg-surface'}`}
              style={{ boxShadow: on ? SHADOW_PILL_ON : SHADOW_PILL_OFF }}>
              <Text className={`text-[13px] ${on ? 'font-sans-bold text-surface' : 'font-sans-sb text-ink-muted'}`}>
                {t}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="gap-2.5 px-5 pb-8 pt-3.5">
        {!admin && (
          <Pressable
            accessibilityRole="button"
            className="min-h-[60px] flex-row items-center gap-3 rounded-card bg-surface px-4 active:scale-[.985]"
            style={{ boxShadow: SHADOW.raised }}>
            <View
              className="h-10 w-10 flex-none items-center justify-center rounded-[14px] bg-primary"
              style={{ boxShadow: '0 8px 18px -8px rgba(11,107,203,.85)' }}>
              <Icon name="edit" size={22} color="#fff" />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="font-sans-bold text-[14.5px] text-ink">Start a discussion</Text>
              <Text className="mt-0.5 font-sans text-[12px] text-ink-soft">
                Ask the community or share a sighting
              </Text>
            </View>
          </Pressable>
        )}

        {threads.map((t) => {
          const hue = TAG_HEX[t.tag];
          return (
            <View key={t.id} className="rounded-panel bg-surface p-4" style={{ boxShadow: SHADOW.raised }}>
              <View className="flex-row items-center gap-3">
                <LinearGradient
                  colors={['#F4F4F2', '#E7E7E3']}
                  start={{ x: 0.25, y: 0 }}
                  end={{ x: 0.75, y: 1 }}
                  style={{ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }}>
                  <Text className="font-mono text-[11px] text-ink-muted">{initials(t.author_name)}</Text>
                </LinearGradient>
                <View className="min-w-0 flex-1">
                  <Text className="font-sans-bold text-[13.5px] text-ink">{t.author_name}</Text>
                  <Text className="mt-0.5 font-mono text-[11px] text-ink-faintest">
                    {t.created_at} · {t.location_text}
                  </Text>
                </View>
                <Text
                  className="rounded-full px-[11px] py-[6px] font-sans-bold text-[11px]"
                  style={{ color: hue, backgroundColor: `${hue}1A` }}>
                  {TAG_LABEL[t.tag]}
                </Text>
              </View>

              <Text
                onPress={() => router.push(`/thread/${t.id}`)}
                className="mt-3.5 font-sans-bold text-[16px] leading-[21.6px] tracking-[-0.32px] text-ink">
                {t.title}
              </Text>
              <Text className="mt-2 font-sans text-[13px] leading-[21.5px] text-ink-muted">{t.body}</Text>

              <View className="mt-3.5 flex-row gap-2">
                <Pressable
                  onPress={() => router.push(`/thread/${t.id}`)}
                  accessibilityRole="button"
                  className="min-h-[44px] flex-row items-center gap-[7px] rounded-chip bg-subtle px-3.5 active:scale-[.96]">
                  <Icon name="chat_bubble" size={17} color="#16181F" />
                  <Text className="font-sans-sb text-[12.5px] text-ink">
                    {t.replies.length} {t.replies.length === 1 ? 'reply' : 'replies'}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  className="min-h-[44px] flex-row items-center gap-[7px] rounded-chip bg-subtle px-3.5 active:scale-[.96]">
                  <Icon name="thumb_up" size={17} color="#6B7280" />
                  <Text className="font-sans-sb text-[12.5px] text-ink-muted">Helpful</Text>
                </Pressable>
              </View>

              {admin && (
                <View className="mt-2 flex-row gap-2 border-t border-[#F0F0ED] pt-3">
                  <Pressable
                    onPress={() => showToast('User suspended', 'info')}
                    accessibilityRole="button"
                    className="min-h-[44px] flex-1 items-center justify-center rounded-chip bg-subtle active:scale-[.97]">
                    <Text className="font-sans-bold text-[12.5px] text-ink">Suspend</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => showToast('Post deleted', 'success')}
                    accessibilityRole="button"
                    className="min-h-[44px] flex-1 flex-row items-center justify-center gap-1.5 rounded-chip bg-danger/10 active:scale-[.97]">
                    <Icon name="delete" size={17} color="#B42318" />
                    <Text className="font-sans-bold text-[12.5px] text-danger">Delete post</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
