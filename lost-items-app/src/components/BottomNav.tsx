import { router, usePathname } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useSession } from '../session';
import { Icon } from './Icon';

type Tab = { key: string; icon: string; label: string; href: string };

const MEMBER_LEFT: Tab[] = [
  { key: 'home', icon: 'space_dashboard', label: 'Home', href: '/' },
  { key: 'lost', icon: 'travel_explore', label: 'Lost', href: '/lost' },
];
const MEMBER_RIGHT: Tab[] = [
  { key: 'found', icon: 'storefront', label: 'Found', href: '/found' },
  { key: 'forum', icon: 'forum', label: 'Forum', href: '/forum' },
];
const ADMIN_LEFT: Tab[] = [
  { key: 'home', icon: 'space_dashboard', label: 'Home', href: '/' },
  { key: 'registry', icon: 'travel_explore', label: 'Registry', href: '/lost' },
  { key: 'moderation', icon: 'flag', label: 'Review', href: '/moderation' },
];
const ADMIN_RIGHT: Tab[] = [
  { key: 'members', icon: 'group', label: 'Members', href: '/members' },
  { key: 'forum', icon: 'forum', label: 'Forum', href: '/forum' },
];

const NavTab = ({ tab, active }: { tab: Tab; active: boolean }) => (
  <Pressable
    onPress={() => router.navigate(tab.href as never)}
    accessibilityRole="tab"
    accessibilityState={{ selected: active }}
    accessibilityLabel={tab.label}
    className={`min-h-[52px] min-w-0 flex-1 items-center justify-center gap-[3px] overflow-hidden rounded-chip px-1 active:scale-[.94] ${active ? 'bg-canvas' : ''}`}>
    <Icon name={tab.icon} size={23} color={active ? '#0B6BCB' : '#9a9ea4'} />
    <Text
      className={`text-[10px] tracking-[0.1px] ${active ? 'font-sans-bold text-primary' : 'font-sans-sb text-ink-faint'}`}>
      {tab.label}
    </Text>
  </Pressable>
);

/**
 * The prototype's floating nav: a white pill with a blue report FAB in the
 * middle. Admins get Review/Members instead of the FAB and Lost/Found split.
 */
export const BottomNav = () => {
  const { session } = useSession();
  const path = usePathname();
  const admin = session?.role === 'admin';
  const left = admin ? ADMIN_LEFT : MEMBER_LEFT;
  const right = admin ? ADMIN_RIGHT : MEMBER_RIGHT;

  const isActive = (t: Tab) => (t.href === '/' ? path === '/' : path.startsWith(t.href));

  return (
    <View className="flex-none px-4 pb-6 pt-2">
      <View
        className="flex-row items-center gap-0.5 rounded-panel bg-surface p-1.5"
        style={{ boxShadow: '0 2px 6px rgba(22,24,31,.06), 0 18px 36px -18px rgba(22,24,31,.5)' }}>
        {left.map((t) => (
          <NavTab key={t.key} tab={t} active={isActive(t)} />
        ))}

        {!admin && (
          <Pressable
            onPress={() => router.push('/report')}
            accessibilityRole="button"
            accessibilityLabel="Report an item"
            className="mx-0.5 h-[52px] w-[52px] flex-none items-center justify-center rounded-btn bg-primary active:scale-[.92]"
            style={{ boxShadow: '0 10px 22px -8px rgba(11,107,203,.85)' }}>
            <Icon name="add" size={27} color="#fff" />
          </Pressable>
        )}

        {right.map((t) => (
          <NavTab key={t.key} tab={t} active={isActive(t)} />
        ))}
      </View>
    </View>
  );
};
