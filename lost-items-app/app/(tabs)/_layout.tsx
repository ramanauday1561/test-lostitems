import { Slot, usePathname } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/src/components/AppHeader';
import { BottomNav } from '@/src/components/BottomNav';
import { SCREEN_TITLES } from '@/src/data/mockData';
import { useSession } from '@/src/session';

/**
 * The prototype has one app shell — mono kicker + 26px title on top, floating
 * nav pill at the bottom — rather than a platform tab bar, so this replaces
 * <Tabs> with a Slot wrapped in that chrome.
 */
export default function AppLayout() {
  const path = usePathname();
  const { session } = useSession();

  const key =
    path === '/' ? (session?.role === 'admin' ? 'dashAdmin' : 'dash')
    : path.startsWith('/lost') ? 'lost'
    : path.startsWith('/found') ? 'found'
    : path.startsWith('/forum') ? 'forum'
    : path.startsWith('/messages') ? 'messages'
    : path.startsWith('/moderation') ? 'moderation'
    : path.startsWith('/members') ? 'members'
    : 'dash';

  const [kicker, title] = SCREEN_TITLES[key] ?? ['', ''];

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader kicker={kicker} title={title} />
      <View className="min-h-0 flex-1">
        <Slot />
      </View>
      <BottomNav />
    </View>
  );
}
