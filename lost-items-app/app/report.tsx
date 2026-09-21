import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { CATEGORIES, type ItemKind } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';
import { useToast } from '@/src/context/ToastContext';

const Label = ({ children }: { children: string }) => (
  <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-soft">{children}</Text>
);

export default function ReportScreen() {
  const { showToast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [kind, setKind] = useState<ItemKind>('lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('');
  const [place, setPlace] = useState('');
  const [when, setWhen] = useState('');
  const [desc, setDesc] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const newId = kind === 'lost' ? 'LOST-1032' : 'FOUND-2019';
  const canContinue = step === 1 ? title.trim() !== '' && category !== '' : place.trim() !== '';
  const handleContinue = () => {
    if (!canContinue) {
      setShowErrors(true);
      return;
    }
    if (step === 2) {
      showToast('Item submitted to registry', 'success');
    }
    setStep(step === 1 ? 2 : 3);
    setShowErrors(false);
  };

  if (step === 3) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas px-6">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <Icon name="check_circle" size={34} color="#0F7B3D" />
        </View>
        <Text className="mb-2.5 mt-5 text-center font-sans-xb text-[25px] leading-[30px] tracking-[-0.8px] text-ink">
          Added to the registry
        </Text>
        <Text className="max-w-[290px] text-center font-sans text-[14.5px] leading-[24px] text-ink-muted">
          Record {newId} is live. A moderator reviews every submission, and we alert you the moment a
          match appears.
        </Text>
        <View className="mt-8 w-full flex-row gap-2">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            className="min-h-[54px] flex-1 items-center justify-center rounded-row bg-primary active:scale-[.97]"
            style={{ boxShadow: '0 12px 26px -12px rgba(11,107,203,.9)' }}>
            <Text className="font-sans-bold text-[14.5px] text-surface">Done</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace(kind === 'lost' ? '/lost' : '/found')}
            accessibilityRole="button"
            className="min-h-[54px] flex-1 items-center justify-center rounded-row bg-subtle active:scale-[.97]">
            <Text className="font-sans-bold text-[14.5px] text-ink">View registry</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-row items-center px-5 pt-5">
        <Pressable
          onPress={() => (step === 2 ? setStep(1) : router.back())}
          accessibilityRole="button"
          accessibilityLabel="Back"
          className="h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
          <Icon name="arrow_back" size={22} color="#16181F" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-6 pb-8 pt-4" keyboardShouldPersistTaps="handled">
        <View className="flex-row gap-1.5">
          <View className="h-1 flex-1 rounded-full bg-primary" />
          <View className={`h-1 flex-1 rounded-full ${step === 2 ? 'bg-primary' : 'bg-[#EAEAE7]'}`} />
        </View>

        <Text className="mb-5 mt-4 font-sans-xb text-[24px] leading-[28.3px] tracking-[-0.77px] text-ink">
          {step === 1 ? 'Report an item' : 'Where and when'}
        </Text>

        <View className="flex-row gap-2 rounded-btn bg-[#F0F0ED] p-1">
          {(['lost', 'found'] as const).map((k) => {
            const on = kind === k;
            return (
              <Pressable
                key={k}
                onPress={() => setKind(k)}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                className={`min-h-[44px] flex-1 items-center justify-center rounded-btn active:scale-[.98] ${on ? 'bg-surface' : ''}`}
                style={on ? { boxShadow: '0 1px 3px rgba(22,24,31,.14)' } : undefined}>
                <Text className={`text-[13.5px] ${on ? 'font-sans-bold text-ink' : 'font-sans-sb text-ink-soft'}`}>
                  {k === 'lost' ? 'I lost it' : 'I found it'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {step === 1 ? (
          <View className="mt-6">
            <Label>What is it</Label>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Black leather wallet"
              placeholderTextColor="#a8acb2"
              accessibilityLabel="What is it"
              className={`mt-2.5 min-h-[52px] rounded-row bg-subtle px-4 font-sans-md text-[15.5px] text-ink ${
                showErrors && !title.trim() ? 'border border-danger' : ''
              } ${showErrors && !title.trim() ? 'mb-3' : 'mb-6'}`}
            />
            {showErrors && !title.trim() && (
              <View className="mb-6 flex-row gap-2 rounded-chip bg-danger/[0.08] px-3 py-2.5">
                <Icon name="error" size={16} color="#B42318" />
                <Text className="flex-1 font-sans-md text-[12px] text-danger">This field is required</Text>
              </View>
            )}
            <Label>Category</Label>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = category === c.name;
                return (
                  <Pressable
                    key={c.name}
                    onPress={() => setCategory(c.name)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    className={`min-h-[44px] items-center justify-center rounded-full px-4 active:scale-[.96] ${on ? 'bg-ink' : 'bg-subtle'}`}>
                    <Text className={`text-[13px] ${on ? 'font-sans-bold text-surface' : 'font-sans-sb text-ink-muted'}`}>
                      {c.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {showErrors && !category && (
              <View className="mt-3 flex-row gap-2 rounded-chip bg-danger/[0.08] px-3 py-2.5">
                <Icon name="error" size={16} color="#B42318" />
                <Text className="flex-1 font-sans-md text-[12px] text-danger">Please select a category</Text>
              </View>
            )}
          </View>
        ) : (
          <View className="mt-6">
            <Label>Where</Label>
            <TextInput
              value={place}
              onChangeText={setPlace}
              placeholder="Union Square subway station"
              placeholderTextColor="#a8acb2"
              accessibilityLabel="Where"
              className={`mt-2.5 min-h-[52px] rounded-row bg-subtle px-4 font-sans-md text-[15.5px] text-ink ${
                showErrors && !place.trim() ? 'border border-danger' : ''
              } ${showErrors && !place.trim() ? 'mb-3' : 'mb-5'}`}
            />
            {showErrors && !place.trim() && (
              <View className="mb-5 flex-row gap-2 rounded-chip bg-danger/[0.08] px-3 py-2.5">
                <Icon name="error" size={16} color="#B42318" />
                <Text className="flex-1 font-sans-md text-[12px] text-danger">This field is required</Text>
              </View>
            )}
            <Label>When</Label>
            <TextInput
              value={when}
              onChangeText={setWhen}
              placeholder="Yesterday, around 6pm"
              placeholderTextColor="#a8acb2"
              accessibilityLabel="When"
              className="mb-5 mt-2.5 min-h-[52px] rounded-row bg-subtle px-4 font-sans-md text-[15.5px] text-ink"
            />
            <Label>Details</Label>
            <TextInput
              value={desc}
              onChangeText={setDesc}
              placeholder="Anything that helps verify ownership"
              placeholderTextColor="#a8acb2"
              accessibilityLabel="Details"
              multiline
              numberOfLines={3}
              className="mb-4 mt-2.5 min-h-[84px] rounded-row bg-subtle px-4 py-3.5 font-sans-md text-[15px] leading-[22.5px] text-ink"
            />
            <View className="min-h-[96px] items-center justify-center gap-1.5 rounded-btn bg-subtle">
              <Icon name="add_a_photo" size={24} color="#a8acb2" />
              <Text className="font-mono text-[10.5px] text-ink-faintest">add a photo</Text>
            </View>
          </View>
        )}

        <Pressable
          onPress={handleContinue}
          disabled={!canContinue}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canContinue }}
          className={`mt-6 min-h-[56px] items-center justify-center rounded-btn ${canContinue ? 'bg-primary active:scale-[.98]' : 'bg-[#EDEDEA]'}`}
          style={canContinue ? { boxShadow: SHADOW.primaryButton } : undefined}>
          <Text className={`font-sans-bold text-[15.5px] ${canContinue ? 'text-surface' : 'text-ink-faintest'}`}>
            {step === 1 ? 'Continue' : 'Submit to registry'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
