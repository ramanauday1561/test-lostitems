import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { FAQS, SUPPORT_SEED, type SupportMessage, answerFor } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';
import { useToast } from '@/src/context/ToastContext';

export default function SupportScreen() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<SupportMessage[]>(SUPPORT_SEED);
  const [draft, setDraft] = useState('');

  const ask = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages((m) => [
      ...m,
      { sender: 'user', body: t, created_at: time },
      { sender: 'bot', body: answerFor(t), created_at: time },
    ]);
    setDraft('');
    showToast('Question sent to support team', 'info');
  };

  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-row items-center gap-3 px-5 pt-5">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
          <Icon name="arrow_back" size={22} color="#16181F" />
        </Pressable>
        <View className="min-w-0 flex-1">
          <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-faint">Support</Text>
          <Text className="font-sans-xb text-[18px] tracking-[-0.45px] text-ink">Community Assistant</Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="gap-2 px-5 pb-4 pt-4">
        {messages.map((m, i) => {
          const mine = m.sender === 'user';
          return (
            <View key={i} className={`max-w-[82%] ${mine ? 'self-end' : 'self-start'}`}>
              <View
                className={`rounded-card px-4 py-3 ${mine ? 'bg-primary' : 'bg-surface'}`}
                style={!mine ? { boxShadow: SHADOW.resting } : undefined}>
                <Text className={`font-sans text-[13.5px] leading-[21px] ${mine ? 'text-surface' : 'text-ink'}`}>
                  {m.body}
                </Text>
              </View>
              <Text className={`mt-1 font-mono text-[9.5px] text-ink-faintest ${mine ? 'text-right' : ''}`}>
                {m.created_at}
              </Text>
            </View>
          );
        })}

        <Text className="mt-3 font-mono text-[10px] uppercase tracking-[1.4px] text-ink-faint">
          Common questions
        </Text>
        <View className="gap-2">
          {FAQS.map((f) => (
            <Pressable
              key={f.question}
              onPress={() => ask(f.question)}
              accessibilityRole="button"
              className="min-h-[48px] flex-row items-center justify-between gap-3 rounded-row bg-surface px-4 py-3 active:scale-[.98]"
              style={{ boxShadow: SHADOW.resting }}>
              <Text className="min-w-0 flex-1 font-sans-sb text-[13px] text-ink">{f.question}</Text>
              <Icon name="chevron_right" size={20} color="#c6c9ce" />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 pb-6 pt-4">
        <View className="min-h-[52px] flex-1 flex-row items-center rounded-panel bg-surface px-[18px]" style={{ boxShadow: SHADOW.resting }}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={() => ask(draft)}
            placeholder="Ask a question"
            placeholderTextColor="#9a9ea4"
            accessibilityLabel="Ask a question"
            className="min-w-0 flex-1 font-sans-md text-[14.5px] text-ink"
          />
        </View>
        <Pressable
          onPress={() => ask(draft)}
          disabled={!draft.trim()}
          accessibilityRole="button"
          accessibilityLabel="Send"
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
