import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  /** Material Symbols name as written in the prototype, e.g. "account_balance_wallet". */
  name: string;
  size?: number;
  color?: string;
};

/**
 * DESIGN.md §3 mandates Material Symbols Rounded and §9 bans hand-drawn SVG icons.
 * MaterialIcons ships with Expo (no native linking, per CLAUDE.md constraints) and
 * uses the same glyph names with hyphens, so screens can quote the prototype verbatim.
 * ponytail: stock MaterialIcons is the filled cut, not Rounded. Bundle the real
 * Material Symbols Rounded variable font (~4MB) if the softer corners start to matter.
 */
export const Icon = ({ name, size = 21, color = '#9a9ea4' }: Props) => (
  <MaterialIcons name={name.replace(/_/g, '-') as never} size={size} color={color} />
);
