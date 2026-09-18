import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { SLIDE_IMAGES, LOGO } from '@/src/assets';
import { SLIDES } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function WelcomeScreen() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;

  return (
    <View className="flex-1 bg-canvas px-6 pb-7">
      <View className="min-h-[44px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-[9px]">
          <Image source={LOGO} resizeMode="contain" style={{ width: 36, height: 36, marginLeft: -3 }} />
          <Text className="font-sans-bold text-[14px] tracking-[-0.14px] text-ink">
            Lost Items Community
          </Text>
        </View>
        <Pressable
          onPress={() => router.replace('/login')}
          accessibilityRole="button"
          className="min-h-[44px] justify-center px-2 active:opacity-70">
          <Text className="font-sans-bold text-[13px] text-ink-soft">Skip</Text>
        </Pressable>
      </View>

      <View className="min-h-0 flex-1 items-center justify-center py-3">
        <View
          className="aspect-square w-full overflow-hidden rounded-well"
          style={{ backgroundColor: slide.tint, boxShadow: SHADOW.hero }}>
          <Image
            source={SLIDE_IMAGES[i]}
            resizeMode="contain"
            style={{ position: 'absolute', left: '9%', top: '9%', width: '82%', height: '82%' }}
          />
        </View>
      </View>

      <View className="flex-none">
        <View className="mb-5 flex-row gap-1.5">
          {SLIDES.map((_, n) => (
            <View
              key={n}
              className={`h-1 flex-1 rounded-full ${n === i ? 'bg-primary' : 'bg-divider'}`}
            />
          ))}
        </View>

        <Text className="font-mono text-[10px] uppercase tracking-[1.6px] text-primary">
          {slide.kicker}
        </Text>
        <Text className="mt-3 min-h-[69px] font-sans-xb text-[30px] leading-[34px] tracking-[-1.05px] text-ink">
          {slide.title}
        </Text>
        <Text className="mt-3 min-h-[96px] font-sans text-[15px] leading-[24px] text-ink-muted">
          {slide.body}
        </Text>

        <View className="mt-5 flex-row items-center gap-2.5">
          {i > 0 && (
            <Pressable
              onPress={() => setI(i - 1)}
              accessibilityRole="button"
              accessibilityLabel="Previous slide"
              className="h-14 w-14 flex-none items-center justify-center rounded-btn bg-surface active:scale-[.94]"
              style={{ boxShadow: SHADOW.floating }}>
              <Icon name="arrow_back" size={23} color="#16181F" />
            </Pressable>
          )}
          <Pressable
            onPress={() => (last ? router.replace('/login') : setI(i + 1))}
            accessibilityRole="button"
            className="min-h-[56px] flex-1 items-center justify-center rounded-btn bg-primary active:scale-[.98]"
            style={{ boxShadow: SHADOW.primaryButton }}>
            <Text className="font-sans-bold text-[15.5px] text-surface">
              {last ? 'Get started' : 'Continue'}
            </Text>
          </Pressable>
        </View>

        <View className="mt-4 flex-row items-center justify-center">
          <Text className="font-sans text-[13px] text-ink-soft">Already a member? </Text>
          <Pressable onPress={() => router.replace('/login')} accessibilityRole="button" className="active:opacity-70">
            <Text className="font-sans-bold text-[13px] text-primary">Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
