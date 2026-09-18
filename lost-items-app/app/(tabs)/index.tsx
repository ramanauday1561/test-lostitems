import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { ItemCard } from '@/src/components/ItemCard';
import {
  REGISTRY_FILTERS,
  filterRegistry,
  type Item,
  type RegistryFilter,
} from '@/src/data/mockData';
import { SHADOW, SHADOW_PILL_OFF, SHADOW_PILL_ON, SHADOW_SEARCH, SHADOW_SEG_ON } from '@/src/design';

export default function RegistryScreen() {
  const [kind, setKind] = useState<'Lost' | 'Found'>('Lost');
  const [filter, setFilter] = useState<RegistryFilter>('All');
  const [query, setQuery] = useState('');

  const registry = useMemo<Item[]>(
    () => filterRegistry(kind, filter, query),
    [kind, filter, query]
  );

  const myPostsEmpty = filter === 'My posts' && registry.length === 0;
  const registryEmpty = registry.length === 0 && filter !== 'My posts';

  return (
    <View className="flex-1 bg-canvas">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="px-5 pb-2">
          {/* Lost / Found segmented control */}
          <View className="flex-row gap-1 rounded-[24px] bg-track p-1">
            {(['Lost', 'Found'] as const).map((k) => {
              const on = kind === k;
              return (
                <Pressable
                  key={k}
                  onPress={() => setKind(k)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: on }}
                  className={`min-h-[44px] flex-1 items-center justify-center rounded-btn active:scale-[.98] ${on ? 'bg-surface' : ''}`}
                  style={on ? { boxShadow: SHADOW_SEG_ON } : undefined}>
                  <Text
                    className={`text-[13.5px] ${on ? 'font-sans-bold text-ink' : 'font-sans-sb text-ink-soft'}`}>
                    {k} items
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Search */}
          <View
            className="mt-3 min-h-[52px] flex-row items-center gap-3 rounded-panel bg-surface px-[18px]"
            style={{ boxShadow: SHADOW_SEARCH }}>
            <Icon name="search" size={21} color="#9a9ea4" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search title, place or ID"
              placeholderTextColor="#9a9ea4"
              accessibilityLabel="Search title, place or ID"
              className="min-w-0 flex-1 font-sans-md text-[14.5px] text-ink"
            />
          </View>

          {/* Filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 mt-[14px]"
            contentContainerClassName="gap-2 px-5 pb-1">
            {REGISTRY_FILTERS.map((f) => {
              const on = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  className={`min-h-[44px] shrink-0 items-center justify-center rounded-full px-[18px] active:scale-[.96] ${on ? 'bg-ink' : 'bg-surface'}`}
                  style={{ boxShadow: on ? SHADOW_PILL_ON : SHADOW_PILL_OFF }}>
                  <Text
                    className={`text-[13px] ${on ? 'font-sans-bold text-surface' : 'font-sans-sb text-ink-muted'}`}>
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Listings */}
        <View className="gap-2 px-5 pb-8 pt-3">
          {registry.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onPress={() => router.push(`/item/${item.id}`)}
            />
          ))}

          {myPostsEmpty && (
            <View
              className="items-center rounded-panel bg-surface px-6 py-[44px]"
              style={{ boxShadow: SHADOW.raised }}>
              <View className="h-[52px] w-[52px] items-center justify-center rounded-row bg-primary/10">
                <Icon name="post_add" size={26} color="#0B6BCB" />
              </View>
              <Text className="mt-4 font-sans-bold text-[15px] text-ink">
                You haven&apos;t posted anything
              </Text>
              <Text className="mb-[18px] mt-1.5 max-w-[240px] text-center font-sans text-[13px] leading-[20px] text-ink-soft">
                Your reports show up here, and you can update their status once the item is handed
                over.
              </Text>
              <Pressable
                onPress={() => router.push('/report')}
                accessibilityRole="button"
                className="min-h-[48px] items-center justify-center rounded-chip bg-primary px-[22px] active:scale-[.97]"
                style={{ boxShadow: '0 12px 26px -12px rgba(11,107,203,.7)' }}>
                <Text className="font-sans-bold text-[13.5px] text-surface">Report an item</Text>
              </Pressable>
            </View>
          )}

          {registryEmpty && (
            <Text className="px-6 py-16 text-center font-sans-md text-[13.5px] text-ink-faintest">
              No records match that search.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
