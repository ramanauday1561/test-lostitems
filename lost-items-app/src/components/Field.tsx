import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { SHADOW } from '../design';
import { Icon } from './Icon';

/** The prototype's input row: white, 18px radius, 56px min-height, leading glyph. */
export const Field = ({
  icon, trailing, className, error, disabled, ...input
}: TextInputProps & {
  icon: string;
  trailing?: React.ReactNode;
  className?: string;
  error?: string;
  disabled?: boolean;
}) => (
  <View>
    <View
      className={`min-h-[56px] flex-row items-center gap-3 rounded-row bg-surface p-4 ${
        error ? 'border border-danger' : ''
      } ${disabled ? 'opacity-50' : ''} ${className ?? ''}`}
      style={{ boxShadow: SHADOW.resting }}>
      <Icon name={icon} size={21} color="#9a9ea4" />
      <TextInput
        placeholderTextColor="#9a9ea4"
        className="min-w-0 flex-1 font-sans-md text-[15.5px] text-ink"
        editable={!disabled}
        {...input}
      />
      {trailing}
    </View>
    {error && <ErrorBlock message={error} />}
  </View>
);

/** 3-bar strength/step indicator — one primitive, per DESIGN.md sec.6. */
export const Bars = ({ filled, total = 3, color = '#0B6BCB' }: { filled: number; total?: number; color?: string }) => (
  <View className="flex-row gap-1.5">
    {Array.from({ length: total }, (_, i) => (
      <View
        key={i}
        className="h-1 flex-1 rounded-full"
        style={{ backgroundColor: i < filled ? color : '#DEDDD8' }}
      />
    ))}
  </View>
);

export const ErrorBlock = ({ message }: { message: string }) => (
  <View className="mt-3 flex-row gap-[9px] rounded-chip bg-danger/[0.08] px-4 py-3.5">
    <Icon name="error" size={19} color="#B42318" />
    <Text className="flex-1 font-sans-md text-[12.5px] leading-[18.75px] text-danger">{message}</Text>
  </View>
);
