import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Bars, ErrorBlock, Field } from '@/src/components/Field';
import { Icon } from '@/src/components/Icon';
import { SOCIALS, strengthOf } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';
import { useSession } from '@/src/session';

export default function SignupScreen() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const s = strengthOf(pass);
  const matched = confirm.length > 0 && confirm === pass;

  const submit = () => {
    if (!username.trim() || !email.trim() || !pass) return setError('All fields are required.');
    if (pass !== confirm) return setError("Passwords don't match. Check both fields.");
    if (s.score < 2) return setError(s.label);
    if (!terms) return setError('Please accept the community guidelines to continue.');
    setError(null);
    signIn('newuser');
  };

  return (
    <ScrollView className="flex-1 bg-canvas" contentContainerClassName="px-6 pb-8 pt-5" keyboardShouldPersistTaps="handled">
      <Pressable
        onPress={() => router.replace('/login')}
        accessibilityRole="button"
        accessibilityLabel="Back to sign in"
        className="-ml-2.5 h-11 w-11 items-center justify-center rounded-full active:scale-[.92]">
        <Icon name="arrow_back" size={24} color="#16181F" />
      </Pressable>

      <Text className="mb-2.5 mt-[22px] font-sans-xb text-[32px] leading-[35.2px] tracking-[-1.12px] text-ink">
        Create your{'\n'}account
      </Text>
      <Text className="font-sans text-[15px] leading-[24px] text-ink-muted">
        Join 10,000+ community members. Free forever, no hidden fees.
      </Text>

      <View className="mt-[26px] gap-2">
        <Field icon="alternate_email" value={username} onChangeText={(t) => { setUsername(t); setError(null); }}
          placeholder="Choose a unique username" autoCapitalize="none" accessibilityLabel="Username" />
        <Field icon="mail" value={email} onChangeText={(t) => { setEmail(t); setError(null); }}
          placeholder="your.email@example.com" autoCapitalize="none" keyboardType="email-address" accessibilityLabel="Email" />
        <Field icon="lock" value={pass} onChangeText={(t) => { setPass(t); setError(null); }}
          placeholder="Create a strong password" secureTextEntry accessibilityLabel="Password" />
        <Field
          icon="lock_reset" value={confirm} onChangeText={(t) => { setConfirm(t); setError(null); }}
          placeholder="Confirm password" secureTextEntry accessibilityLabel="Confirm password"
          trailing={confirm.length > 0 ? (
            <Icon name={matched ? 'check_circle' : 'cancel'} size={20} color={matched ? '#0F7B3D' : '#B42318'} />
          ) : undefined}
        />
      </View>

      <View className="mt-3">
        <Bars filled={s.score} color={s.color} />
        <Text className="mt-2 font-sans-md text-[11.5px]" style={{ color: s.color }}>{s.label}</Text>
      </View>

      <View className="mt-3.5 flex-row items-start gap-2.5">
        <Pressable
          onPress={() => { setTerms(!terms); setError(null); }}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: terms }}
          accessibilityLabel="Accept community guidelines"
          className="-ml-[11px] -mt-[11px] h-11 w-11 flex-none items-center justify-center">
          <View
            className={`h-[22px] w-[22px] items-center justify-center rounded-[7px] ${terms ? 'bg-primary' : 'bg-surface'}`}
            style={!terms ? { boxShadow: 'inset 0 0 0 1.5px #DEDDD8' } : undefined}>
            {terms && <Icon name="check" size={15} color="#fff" />}
          </View>
        </Pressable>
        <Text className="flex-1 font-sans text-[12.5px] leading-[18.75px] text-ink-muted">
          I agree to the{' '}
          <Text
            onPress={() => router.push('/guidelines')}
            className="font-sans-sb text-[12.5px] text-primary underline">
            community guidelines and safe meetup rules
          </Text>
          .
        </Text>
      </View>

      {error && <ErrorBlock message={error} />}

      <Pressable
        onPress={submit}
        accessibilityRole="button"
        className="mt-4 min-h-[56px] items-center justify-center rounded-btn bg-primary active:scale-[.98]"
        style={{ boxShadow: SHADOW.primaryButton }}>
        <Text className="font-sans-bold text-[15.5px] text-surface">Create account</Text>
      </Pressable>

      <View className="mt-[22px] flex-row items-center gap-3">
        <View className="h-px flex-1 bg-divider" />
        <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-soft">
          Or sign up with a social account
        </Text>
        <View className="h-px flex-1 bg-divider" />
      </View>
      <View className="mt-4 flex-row gap-2">
        {SOCIALS.map((so) => (
          <Pressable
            key={so.name}
            onPress={() => signIn('newuser')}
            accessibilityRole="button"
            accessibilityLabel={`Sign up with ${so.name}`}
            className="min-h-[64px] flex-1 items-center justify-center gap-[7px] rounded-btn bg-surface active:scale-[.95]"
            style={{ boxShadow: SHADOW.resting }}>
            <View
              className="h-6 w-6 items-center justify-center rounded-full"
              style={{
                backgroundColor: so.bg,
                boxShadow: so.ring
                  ? so.bg === '#fff' ? 'inset 0 0 0 1px #D6D5D0' : 'inset 0 0 0 1px rgba(255,255,255,.35)'
                  : undefined,
              }}>
              <Text className="font-sans-bold text-[13px]" style={{ color: so.fg }}>{so.mark}</Text>
            </View>
            <Text className="font-sans-sb text-[11px] text-ink-muted">{so.name}</Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-[22px] flex-row items-center justify-center">
        <Text className="font-sans text-[13px] text-ink-muted">Already a member? </Text>
        <Pressable onPress={() => router.replace('/login')} accessibilityRole="button" className="min-h-[44px] justify-center active:opacity-70">
          <Text className="font-sans-bold text-[13px] text-primary">Sign in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
