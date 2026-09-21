import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { FORUM_THREADS, type ForumReply, initials } from '@/src/data/mockData';
import { SHADOW, STATUS_HEX } from '@/src/design';
import { useToast } from '@/src/context/ToastContext';

const TAG_HEX: Record<string, string> = { sighting: '#0B6BCB', reunited: STATUS_HEX.Reunited, question: '#6B7280' };
const TAG_LABEL: Record<string, string> = { sighting: 'Sighting', reunited: 'Reunited', question: 'Question' };

export default function ThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showToast } = useToast();
  const thread = FORUM_THREADS.find((t) => String(t.id) === id);
  const [replies, setReplies] = useState<ForumReply[]>(thread?.replies ?? []);
  const [draft, setDraft] = useState('');

  if (!thread) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas px-6">
        <Text className="font-sans-bold text-[15px] text-ink">Thread not found</Text>
      </View>
    );
  }

  const hue = TAG_HEX[thread.tag];

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setReplies([...replies, { id: replies.length + 1, author_username: 'user', author_name: 'Simple User', body: t, created_at: 'Just now' }]);
    setDraft('');
    showToast('Reply posted', 'success');
  };

  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-row items-center px-5 pt-5">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          className="h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
          <Icon name="arrow_back" size={22} color="#16181F" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-4 pt-4">
        <View className="rounded-panel bg-surface p-4" style={{ boxShadow: SHADOW.raised }}>
          <View className="flex-row items-center gap-3">
            <LinearGradient
              colors={['#F4F4F2', '#E7E7E3']}
              start={{ x: 0.25, y: 0 }} end={{ x: 0.75, y: 1 }}
              style={{ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }}>
              <Text className="font-mono text-[11px] text-ink-muted">{initials(thread.author_name)}</Text>
            </LinearGradient>
            <View className="min-w-0 flex-1">
              <Text className="font-sans-bold text-[13.5px] text-ink">{thread.author_name}</Text>
              <Text className="mt-0.5 font-mono text-[11px] text-ink-faintest">
                {thread.created_at} · {thread.location_text}
              </Text>
            </View>
            <Text className="rounded-full px-[11px] py-[6px] font-sans-bold text-[11px]"
              style={{ color: hue, backgroundColor: `${hue}1A` }}>
              {TAG_LABEL[thread.tag]}
            </Text>
          </View>
          <Text className="mt-3.5 font-sans-xb text-[20px] leading-[26px] tracking-[-0.5px] text-ink">
            {thread.title}
          </Text>
          <Text className="mt-2.5 font-sans text-[13.5px] leading-[22px] text-ink-muted">{thread.body}</Text>
        </View>

        <Text className="mb-2.5 mt-5 font-sans-xb text-[16px] tracking-[-0.32px] text-ink">
          {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
        </Text>

        <View className="gap-2">
          {replies.map((r) => (
            <View key={r.id} className="flex-row gap-3 rounded-[22px] bg-surface p-3.5" style={{ boxShadow: SHADOW.resting }}>
              <LinearGradient
                colors={['#F4F4F2', '#E7E7E3']}
                start={{ x: 0.25, y: 0 }} end={{ x: 0.75, y: 1 }}
                style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                <Text className="font-mono text-[10px] text-ink-muted">{initials(r.author_name)}</Text>
              </LinearGradient>
              <View className="min-w-0 flex-1">
                <View className="flex-row items-baseline justify-between gap-2">
                  <Text className="font-sans-bold text-[12.5px] text-ink">{r.author_name}</Text>
                  <Text className="font-mono text-[10px] text-ink-faintest">{r.created_at}</Text>
                </View>
                <Text className="mt-1.5 font-sans text-[12.5px] leading-[20px] text-ink-muted">{r.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 pb-6 pt-4">
        <View className="min-h-[52px] flex-1 flex-row items-center rounded-panel bg-surface px-[18px]" style={{ boxShadow: SHADOW.resting }}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            placeholder="Write a reply"
            placeholderTextColor="#9a9ea4"
            accessibilityLabel="Write a reply"
            className="min-w-0 flex-1 font-sans-md text-[14.5px] text-ink"
          />
        </View>
        <Pressable
          onPress={send}
          disabled={!draft.trim()}
          accessibilityRole="button"
          accessibilityLabel="Send reply"
          className={`h-[52px] w-[52px] flex-none items-center justify-center rounded-btn bg-primary active:scale-[.92] ${
            !draft.trim() ? 'opacity-50' : ''
          }`}
          style={{ boxShadow: '0 10px 22px -8px rgba(11,107,203,.85)' }}>
          <Icon name="send" size={22} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
