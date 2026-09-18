import { Stack } from 'expo-router';

// Without this the group has no index and expo-router falls through to `login`
// alphabetically, skipping onboarding entirely.
export const unstable_settings = { initialRouteName: 'welcome' };

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
