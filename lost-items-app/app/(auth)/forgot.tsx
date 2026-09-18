import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Bars, ErrorBlock, Field } from '@/src/components/Field';
import { Icon } from '@/src/components/Icon';
import { RESET_COPY, RESET_ORDER, type ResetStage, strengthOf } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';

export default function ForgotScreen() {
  const [stage, setStage] = useState<ResetStage>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [kicker, title, body] = RESET_COPY[stage];
  const idx = RESET_ORDER.indexOf(stage);
  const s = strengthOf(pass);
  const matched = confirm.length > 0 && confirm === pass;

  const next = () => {
    if (stage === 'email') {
      if (!email.trim()) return setError('Enter the email on your account.');
      setError(null); return setStage('code');
    }
    if (stage === 'code') {
      if (code.trim().length !== 6) return setError('Enter the 6-digit code we sent.');
      setError(null); return setStage('reset');
    }
    if (stage === 'reset') {
      if (pass !== confirm) return setError("Passwords don't match. Check both fields.");
      if (s.score < 2) return setError(s.label);
      setError(null); return setStage('done');
    }
    router.replace('/login');
  };

  const back = () => {
    if (stage === 'email') return router.replace('/login');
    setError(null);
    setStage(RESET_ORDER[Math.max(0, idx - 1)]);
  };

  const cta =
    stage === 'email' ? 'Send the code'
    : stage === 'code' ? 'Verify code'
    : stage === 'reset' ? 'Save new password'
    : 'Back to sign in';

  return (
    <ScrollView className="flex-1 bg-canvas" contentContainerClassName="px-6 pb-8 pt-5" keyboardShouldPersistTaps="handled">
      <Pressable
        onPress={back}
        accessibilityRole="button"
        accessibilityLabel="Back"
        className="-ml-2.5 h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
        <Icon name="arrow_back" size={24} color="#16181F" />
      </Pressable>

      <View className="mt-5">
        <Bars filled={stage === 'done' ? 3 : idx + 1} />
      </View>

      <Text className="mt-4 font-mono text-[10px] uppercase tracking-[1.6px] text-primary">{kicker}</Text>
      <Text className="my-2.5 font-sans-xb text-[32px] leading-[35.2px] tracking-[-1.12px] text-ink">{title}</Text>
      <Text className="font-sans text-[15px] leading-[24px] text-ink-muted">{body}</Text>

      <View className="mt-[26px]">
        {stage === 'email' && (
          <Field icon="mail" value={email} onChangeText={(t) => { setEmail(t); setError(null); }}
            placeholder="Email on your account" autoCapitalize="none" keyboardType="email-address"
            accessibilityLabel="Email on your account" />
        )}

        {stage === 'code' && (
          <>
            <View className="mb-3 flex-row items-center gap-3 rounded-row bg-primary/[0.07] px-4 py-3.5">
              <Icon name="mark_email_read" size={20} color="#0B6BCB" />
              <Text numberOfLines={1} className="min-w-0 flex-1 font-sans-md text-[12.5px] leading-[18.75px] text-primary">
                Code sent to {email}
              </Text>
            </View>
            <Field icon="pin" value={code} onChangeText={(t) => { setCode(t); setError(null); }}
              placeholder="6-digit code" keyboardType="number-pad" maxLength={6}
              accessibilityLabel="6-digit code"
              className="[&_input]:font-mono" />
            <View className="mt-1 flex-row items-center justify-between">
              <Text className="font-sans text-[12px] text-ink-soft">Didn&apos;t get it?</Text>
              <Pressable accessibilityRole="button" className="min-h-[44px] justify-center pl-2 active:opacity-60">
                <Text className="font-sans-sb text-[13px] text-primary">Resend code</Text>
              </Pressable>
            </View>
          </>
        )}

        {stage === 'reset' && (
          <>
            <Field icon="lock" value={pass} onChangeText={(t) => { setPass(t); setError(null); }}
              placeholder="New password" secureTextEntry accessibilityLabel="New password" />
            <Field icon="lock_reset" value={confirm} onChangeText={(t) => { setConfirm(t); setError(null); }}
              placeholder="Confirm new password" secureTextEntry accessibilityLabel="Confirm new password"
              className="mt-2"
              trailing={confirm.length > 0 ? (
                <Icon name={matched ? 'check_circle' : 'cancel'} size={20} color={matched ? '#0F7B3D' : '#B42318'} />
              ) : undefined} />
            <View className="mt-3">
              <Bars filled={s.score} color={s.color} />
              <Text className="mt-2 font-sans-md text-[11.5px]" style={{ color: s.color }}>{s.label}</Text>
            </View>
          </>
        )}

        {stage === 'done' && (
          <View
            className="items-center rounded-panel bg-surface px-6 py-10"
            style={{ boxShadow: SHADOW.prominent }}>
            <View className="h-[60px] w-[60px] items-center justify-center rounded-full bg-success/[0.12]">
              <Icon name="task_alt" size={32} color="#0F7B3D" />
            </View>
            <Text className="mt-4 font-sans-xb text-[18px] text-ink">Password changed</Text>
            <Text className="mt-1.5 text-center font-sans text-[13px] leading-[20px] text-ink-muted">
              You can sign in with your new password now.
            </Text>
          </View>
        )}

        {error && <ErrorBlock message={error} />}

        <Pressable
          onPress={next}
          accessibilityRole="button"
          className="mt-4 min-h-[56px] items-center justify-center rounded-btn bg-primary active:scale-[.98]"
          style={{ boxShadow: SHADOW.primaryButton }}>
          <Text className="font-sans-bold text-[15.5px] text-surface">{cta}</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/login')}
          accessibilityRole="button"
          className="mt-3 min-h-[44px] items-center justify-center active:opacity-70">
          <Text className="font-sans-sb text-[13px] text-primary">Back to sign in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
