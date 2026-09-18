import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/Icon';
import { LOGO } from '@/src/assets';
import { QUICK_LOGINS, SOCIALS, signInError } from '@/src/data/mockData';
import { SHADOW } from '@/src/design';
import { useSession } from '@/src/session';

export default function LoginScreen() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const e = signInError(username, password);
    setError(e);
    if (!e) signIn(username);
  };

  return (
    <View className="flex-1 bg-canvas px-6 py-8">
      <View className="flex-row items-center gap-2.5">
        <Image source={LOGO} resizeMode="contain" style={{ width: 46, height: 46, marginLeft: -4 }} />
        <Text className="font-sans-bold text-[15px] tracking-[-0.15px] text-ink">
          Lost Items Community
        </Text>
      </View>

      <Text className="mb-3 mt-14 font-sans-xb text-[34px] leading-[36.7px] tracking-[-1.19px] text-ink">
        Welcome{'\n'}back
      </Text>
      <Text className="font-sans text-[15px] leading-[24px] text-ink-muted">
        Great to see you again. Let&apos;s find what you&apos;re looking for.
      </Text>

      <View className="mt-auto pt-10">
        <View
          className="mb-2 min-h-[56px] flex-row items-center gap-3 rounded-row bg-surface p-4"
          style={{ boxShadow: SHADOW.resting }}>
          <Icon name="person" size={21} color="#9a9ea4" />
          <TextInput
            value={username}
            onChangeText={(t) => { setUsername(t); setError(null); }}
            placeholder="Username or email"
            placeholderTextColor="#9a9ea4"
            autoCapitalize="none"
            accessibilityLabel="Username or email"
            className="min-w-0 flex-1 font-sans-md text-[15.5px] text-ink"
          />
        </View>
        <View
          className="min-h-[56px] flex-row items-center gap-3 rounded-row bg-surface p-4"
          style={{ boxShadow: SHADOW.resting }}>
          <Icon name="lock" size={21} color="#9a9ea4" />
          <TextInput
            value={password}
            onChangeText={(t) => { setPassword(t); setError(null); }}
            placeholder="Password"
            placeholderTextColor="#9a9ea4"
            secureTextEntry
            accessibilityLabel="Password"
            className="min-w-0 flex-1 font-sans-md text-[15.5px] text-ink"
          />
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <Pressable
            onPress={() => setRemember(!remember)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
            className="min-h-[44px] flex-row items-center gap-2.5 pr-2">
            <View
              className={`h-[22px] w-[22px] items-center justify-center rounded-[7px] ${remember ? 'bg-primary' : 'bg-surface'}`}
              style={!remember ? { boxShadow: 'inset 0 0 0 1.5px #DEDDD8' } : undefined}>
              {remember && <Icon name="check" size={15} color="#fff" />}
            </View>
            <Text className="font-sans-md text-[13.5px] text-ink-muted">Remember me</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/forgot')} accessibilityRole="button" className="min-h-[44px] justify-center pl-2 active:opacity-60">
            <Text className="font-sans-sb text-[13.5px] text-primary">Forgot password?</Text>
          </Pressable>
        </View>

        {error && (
          <View className="mt-2 flex-row gap-[9px] rounded-chip bg-danger/[0.08] px-4 py-3.5">
            <Icon name="error" size={19} color="#B42318" />
            <Text className="flex-1 font-sans-md text-[12.5px] leading-[18.75px] text-danger">
              {error}
            </Text>
          </View>
        )}

        <Pressable
          onPress={submit}
          accessibilityRole="button"
          className="mt-4 min-h-[56px] items-center justify-center rounded-btn bg-primary active:scale-[.98]"
          style={{ boxShadow: SHADOW.primaryButton }}>
          <Text className="font-sans-bold text-[15.5px] text-surface">Sign in</Text>
        </Pressable>

        <View className="mt-5 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-divider" />
          <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-soft">
            Or continue with a social account
          </Text>
          <View className="h-px flex-1 bg-divider" />
        </View>
        <View className="mt-4 flex-row gap-2">
          {SOCIALS.map((s) => (
            <Pressable
              key={s.name}
              onPress={() => signIn('user')}
              accessibilityRole="button"
              accessibilityLabel={`Continue with ${s.name}`}
              className="min-h-[64px] flex-1 items-center justify-center gap-[7px] rounded-btn bg-surface active:scale-[.95]"
              style={{ boxShadow: SHADOW.resting }}>
              <View
                className="h-6 w-6 items-center justify-center rounded-full"
                style={{
                  backgroundColor: s.bg,
                  boxShadow: s.ring
                    ? s.bg === '#fff' ? 'inset 0 0 0 1px #D6D5D0' : 'inset 0 0 0 1px rgba(255,255,255,.35)'
                    : undefined,
                }}>
                <Text className="font-sans-bold text-[13px]" style={{ color: s.fg }}>{s.mark}</Text>
              </View>
              <Text className="font-sans-sb text-[11px] text-ink-muted">{s.name}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-6 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-divider" />
          <Text className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-soft">
            Quick test logins
          </Text>
          <View className="h-px flex-1 bg-divider" />
        </View>
        <View className="mt-4 gap-2">
          {QUICK_LOGINS.map((q) => (
            <Pressable
              key={q.handle}
              onPress={() => signIn(q.handle)}
              accessibilityRole="button"
              accessibilityLabel={`Sign in as ${q.name}`}
              className="min-h-[56px] flex-row items-center gap-3 rounded-row bg-surface px-4 active:scale-[.98]"
              style={{ boxShadow: SHADOW.resting }}>
              <View
                className="h-[34px] w-[34px] flex-none items-center justify-center rounded-chip"
                style={{ backgroundColor: q.tint }}>
                <Icon name={q.icon} size={19} color={q.color} />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="font-sans-bold text-[13.5px] text-ink">{q.name}</Text>
                <Text className="mt-0.5 font-sans text-[11px] text-ink-soft">{q.desc}</Text>
              </View>
              <Text className="flex-none font-mono text-[10.5px] text-ink-faintest">{q.handle}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-5 flex-row items-center justify-center">
          <Text className="font-sans text-[13px] text-ink-muted">New here? </Text>
          <Pressable onPress={() => router.push('/signup')} accessibilityRole="button" className="min-h-[44px] justify-center active:opacity-70">
            <Text className="font-sans-bold text-[13px] text-primary">Join free in 30 seconds</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
