import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { MEMBERS, formatDate, initials } from '@/src/data/mockData';
import { SHADOW, SHADOW_SEARCH } from '@/src/design';
import { useToast } from '@/src/context/ToastContext';

export default function MembersScreen() {
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState(MEMBERS);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => `${m.full_name} ${m.username}`.toLowerCase().includes(q));
  }, [members, query]);

  const toggle = (id: string) =>
    setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, is_suspended: !m.is_suspended } : m)));

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View className="px-5 pb-8">
        <View
          className="min-h-[52px] flex-row items-center gap-3 rounded-panel bg-surface px-[18px]"
          style={{ boxShadow: SHADOW_SEARCH }}>
          <Icon name="search" size={21} color="#9a9ea4" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search members"
            placeholderTextColor="#9a9ea4"
            accessibilityLabel="Search members"
            className="min-w-0 flex-1 font-sans-md text-[14.5px] text-ink"
          />
        </View>

        <View className="mt-3 gap-2">
          {list.map((m) => (
            <View key={m.id} className="rounded-[24px] bg-surface p-4" style={{ boxShadow: SHADOW.raised }}>
              <View className="flex-row items-center gap-3">
                <LinearGradient
                  colors={['#F4F4F2', '#E7E7E3']}
                  start={{ x: 0.25, y: 0 }}
                  end={{ x: 0.75, y: 1 }}
                  style={{ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' }}>
                  <Text className="font-mono text-[12px] text-ink-muted">{initials(m.full_name ?? m.username)}</Text>
                </LinearGradient>
                <View className="min-w-0 flex-1">
                  <Text className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">{m.full_name}</Text>
                  <Text className="mt-[3px] font-mono text-[11px] text-ink-soft">
                    {m.username} · joined {formatDate(m.created_at).slice(-8)}
                  </Text>
                </View>
                <Text
                  className={`rounded-full px-[11px] py-[6px] font-sans-bold text-[11px] ${m.is_suspended ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>
                  {m.is_suspended ? 'Suspended' : 'Active'}
                </Text>
              </View>
              <View className="mt-3.5 flex-row gap-2">
                <Pressable
                  onPress={() => {
                    toggle(m.id);
                    showToast(m.is_suspended ? `${m.full_name} restored` : `${m.full_name} suspended`, 'info');
                  }}
                  accessibilityRole="button"
                  className="min-h-[44px] flex-1 items-center justify-center rounded-chip bg-subtle active:scale-[.97]">
                  <Text className="font-sans-bold text-[13px] text-ink">
                    {m.is_suspended ? 'Restore' : 'Suspend'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setMembers((ms) => ms.filter((x) => x.id !== m.id));
                    showToast(`User ${m.full_name} deleted`, 'success');
                  }}
                  accessibilityRole="button"
                  className="min-h-[44px] flex-1 flex-row items-center justify-center gap-1.5 rounded-chip bg-danger/10 active:scale-[.97]">
                  <Icon name="delete" size={18} color="#B42318" />
                  <Text className="font-sans-bold text-[13px] text-danger">Delete user</Text>
                </Pressable>
              </View>
            </View>
          ))}

          {list.length === 0 && (
            <Text className="px-6 py-16 text-center font-sans-md text-[13.5px] text-ink-faintest">
              No members match that search.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
