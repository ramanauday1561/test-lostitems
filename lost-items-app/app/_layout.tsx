import {
  IBMPlexMono_600SemiBold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  PublicSans_800ExtraBold,
} from '@expo-google-fonts/public-sans';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/components/useColorScheme';
import { SessionProvider, useSession } from '@/src/session';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Family names match tailwind.config.js fontFamily tokens (DESIGN.md sec.3).
    PublicSans: PublicSans_400Regular,
    'PublicSans-Medium': PublicSans_500Medium,
    'PublicSans-SemiBold': PublicSans_600SemiBold,
    'PublicSans-Bold': PublicSans_700Bold,
    'PublicSans-ExtraBold': PublicSans_800ExtraBold,
    IBMPlexMono: IBMPlexMono_600SemiBold,
    // Preloaded: vector-icons render invisible on first paint otherwise.
    ...MaterialIcons.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}

/**
 * CLAUDE.md sec.2: clamp the app to a phone-width column on wide screens so the
 * browser keeps the native feel. No-op on iOS and Android.
 */
function Contained({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') return <>{children}</>;
  return (
    <View className="flex-1 bg-canvas">
      <View
        className="mx-auto w-full max-w-md flex-1 bg-canvas"
        style={{ boxShadow: '0 40px 80px -20px rgba(22,24,31,.35)' }}>
        {children}
      </View>
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session } = useSession();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Contained>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Signed out sees onboarding and login; signed in sees the app. */}
          <Stack.Protected guard={!session}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>

          <Stack.Protected guard={!!session}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          {/* DESIGN.md sec.9 calls a full-page route for a secondary flow an
              anti-pattern, so the item route that INSTRUCTIONS 3.1 requires is
              presented as a sheet. */}
            {/* DESIGN.md sec.9: secondary flows arrive as sheets, not pages. */}
            <Stack.Screen name="item/[id]" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="report" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="profile" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="messages/[id]" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="thread/[id]" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="support" options={{ presentation: 'modal', headerShown: false }} />
          </Stack.Protected>

          {/* Unguarded: reachable from signup and from the member profile alike.
              Declared last so it never wins the initial-route race when the
              session flips and the guards re-resolve. */}
          <Stack.Screen name="guidelines" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </Contained>
    </ThemeProvider>
  );
}
