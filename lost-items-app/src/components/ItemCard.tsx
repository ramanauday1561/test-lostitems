import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import type { Item } from '../data/mockData';
import { SHADOW, STATUS_HEX } from '../design';
import { Icon } from './Icon';

/**
 * Registry row card, matching the prototype's markup:
 * 60px gradient well + title + location row + mono "ID · date" + status chip.
 */
export const ItemCard = ({ item, onPress }: { item: Item; onPress?: () => void }) => {
  const hue = STATUS_HEX[item.status];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${item.status}, ${item.location}`}
      className="w-full flex-row items-center gap-[14px] rounded-[24px] bg-surface p-3 active:scale-[.985]"
      style={{ boxShadow: SHADOW.raised }}>
      <LinearGradient
        colors={['#F4F4F2', '#E9E9E5']}
        start={{ x: 0.25, y: 0 }}
        end={{ x: 0.75, y: 1 }}
        className="h-[60px] w-[60px] items-center justify-center rounded-[20px]">
        <Icon name={item.icon} size={26} color="#b7bbc1" />
      </LinearGradient>

      <View className="min-w-0 flex-1">
        <Text
          numberOfLines={1}
          className="font-sans-bold text-[15px] tracking-[-0.225px] text-ink">
          {item.title}
        </Text>
        <View className="mt-1 flex-row items-center gap-1">
          <Icon name="location_on" size={14} color="#8b8f95" />
          <Text numberOfLines={1} className="font-sans-md text-[12px] text-ink-soft">
            {item.location}
          </Text>
        </View>
        <Text className="mt-[5px] font-mono text-[10px] tracking-[0.4px] text-ink-faintest">
          {item.id} · {item.date}
        </Text>
      </View>

      <Text
        className="shrink-0 rounded-full px-[11px] py-[6px] font-sans-bold text-[11px]"
        style={{ color: hue, backgroundColor: `${hue}1A` }}>
        {item.status}
      </Text>
    </Pressable>
  );
};
