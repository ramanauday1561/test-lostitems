import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { ME, displayStatus, formatDate, getItem, initials } from '@/src/data/mockData';
import { SHADOW, STATUS_HEX } from '@/src/design';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getItem(id);

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas px-6">
        <Text className="font-sans-bold text-[15px] text-ink">Record not found</Text>
        <Text className="mt-1.5 text-center font-sans text-[13px] leading-[20px] text-ink-soft">
          {id} is not in the registry.
        </Text>
      </View>
    );
  }

  const status = displayStatus(item);
  const hue = STATUS_HEX[status];
  const isOwner = item.reporter_username === ME;
  const canClaim = !isOwner;

  const rows = [
    { k: 'Status', v: status },
    { k: 'Where', v: item.location_text },
    { k: 'When', v: formatDate(item.date_occurred) },
  ];

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

      <ScrollView contentContainerClassName="px-5 pb-8 pt-2">
        {/* className is dropped on LinearGradient (see ItemCard). */}
        <LinearGradient
          colors={['#F4F4F2', '#E9E9E5']}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 0.75, y: 1 }}
          style={{
            height: 196,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <Icon name={item.icon} size={52} color="#b7bbc1" />
          <Text className="font-mono text-[10px] tracking-[0.6px] text-ink-faintest">
            photo submitted with the record
          </Text>
        </LinearGradient>

        <View className="mt-[18px] flex-row items-center justify-between gap-2.5">
          <Text className="font-mono text-[11px] tracking-[0.55px] text-ink-soft">
            {item.short_code}
          </Text>
          <Text
            className="rounded-full px-[11px] py-[6px] font-sans-bold text-[11px]"
            style={{ color: hue, backgroundColor: `${hue}1A` }}>
            {status}
          </Text>
        </View>

        <Text className="mt-2.5 font-sans-xb text-[25px] leading-[29.5px] tracking-[-0.8px] text-ink">
          {item.title}
        </Text>
        <Text className="mt-3 font-sans text-[14.5px] leading-[24px] text-ink-muted">
          {item.description}
        </Text>

        <View className="mt-5 rounded-[22px] bg-subtle px-4 py-1.5">
          {rows.map((r) => (
            <View
              key={r.k}
              className="min-h-[48px] flex-row items-center justify-between gap-3">
              <Text className="font-sans-md text-[13px] text-ink-soft">{r.k}</Text>
              <Text className="flex-1 text-right font-sans-bold text-[13px] text-ink">{r.v}</Text>
            </View>
          ))}
        </View>

        {/* Reporter info with user profile opener */}
        <Pressable
          onPress={() => router.push('/modal')}
          accessibilityRole="button"
          className="mt-4 flex-row items-center gap-3 rounded-[22px] bg-primary/[0.07] p-3">
          <LinearGradient
            colors={['#F4F4F2', '#E7E7E3']}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.75, y: 1 }}
            style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text className="font-mono text-[11px] text-ink-muted">{initials(item.reporter_username)}</Text>
          </LinearGradient>
          <View className="min-w-0 flex-1">
            <Text className="font-sans-bold text-[13.5px] text-ink">{item.reporter_username}</Text>
            <Text className="mt-0.5 font-sans-md text-[11px] text-ink-soft">Submitted this item</Text>
          </View>
          <Icon name="info" size={20} color="#0B6BCB" />
        </Pressable>

        {isOwner && (
          <View className="mt-3 rounded-[22px] bg-primary/[0.07] p-4">
            <View className="flex-row items-center gap-[9px]">
              <Icon name="how_to_reg" size={19} color="#0B6BCB" />
              <Text className="font-sans-bold text-[13px] text-primary">You posted this</Text>
            </View>
            <Text className="mt-2 font-sans text-[12.5px] leading-[19.5px] text-ink-muted">
              {status === 'Reunited'
                ? 'Handed over. Members can still read the record but it no longer shows as open.'
                : 'When you hand the item to its owner, update the status here so the community stops searching.'}
            </Text>
          </View>
        )}

        {canClaim && (
          <Pressable
            onPress={() => router.push(`/messages/${item.short_code}`)}
            accessibilityRole="button"
            className="mt-5 min-h-[56px] items-center justify-center rounded-btn bg-primary active:scale-[.98]"
            style={{ boxShadow: SHADOW.primaryButton }}>
            <Text className="font-sans-bold text-[15.5px] text-surface">
              {item.kind === 'found' ? 'This is mine' : 'I have found this'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
