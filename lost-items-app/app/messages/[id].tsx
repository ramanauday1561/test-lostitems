import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { CONVERSATIONS, type Message } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const convo = CONVERSATIONS.find((c) => c.item_short_code === id);
  const [messages, setMessages] = useState<Message[]>(convo?.messages ?? []);
  const [draft, setDraft] = useState('');

  if (!convo) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas px-6">
        <Text className="font-sans-bold text-[15px] text-ink">Conversation not found</Text>
      </View>
    );
  }

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages([...messages, { sender: 'me', body: t, created_at: time }]);
    setDraft('');
  };

  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-row items-center gap-3 px-5 pt-5">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          className="h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
          <Icon name="arrow_back" size={22} color="#16181F" />
        </Pressable>
        <View className="min-w-0 flex-1">
          <Text numberOfLines={1} className="font-sans-bold text-[15px] text-ink">{convo.item_title}</Text>
          <Text className="font-mono text-[10.5px] text-ink-faintest">
            {convo.item_short_code} · {convo.with_username}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="gap-2 px-5 pb-4 pt-4">
        {messages.map((m, i) => {
          const mine = m.sender === 'me';
          return (
            <View key={i} className={`max-w-[78%] ${mine ? 'self-end' : 'self-start'}`}>
              <View
                className={`rounded-card px-4 py-3 ${mine ? 'bg-primary' : 'bg-surface'}`}
                style={!mine ? { boxShadow: SHADOW.resting } : undefined}>
                <Text className={`font-sans text-[13.5px] leading-[20px] ${mine ? 'text-surface' : 'text-ink'}`}>
                  {m.body}
                </Text>
              </View>
              <Text className={`mt-1 font-mono text-[9.5px] text-ink-faintest ${mine ? 'text-right' : ''}`}>
                {m.created_at}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 pb-6 pt-2">
        <View
          className="min-h-[52px] flex-1 flex-row items-center rounded-panel bg-surface px-[18px]"
          style={{ boxShadow: SHADOW.resting }}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            placeholder="Write a message"
            placeholderTextColor="#9a9ea4"
            accessibilityLabel="Write a message"
            className="min-w-0 flex-1 font-sans-md text-[14.5px] text-ink"
          />
        </View>
        <Pressable
          onPress={send}
          accessibilityRole="button"
          accessibilityLabel="Send"
          className="h-[52px] w-[52px] flex-none items-center justify-center rounded-btn bg-primary active:scale-[.92]"
          style={{ boxShadow: '0 10px 22px -8px rgba(11,107,203,.85)' }}>
          <Icon name="send" size={22} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
