import { forwardRef, useCallback } from "react";
import { Pressable, type PressableProps, type PressableStateCallbackType, type StyleProp, type View, type ViewStyle } from "react-native";

export interface PressableOpacityProps extends PressableProps {
	/**
	 * The opacity to use when `disabled={true}`
	 *
	 * @default 0.3
	 */
	disabledOpacity?: number;
	/**
	 * The opacity to animate to when the user presses the button
	 *
	 * @default 0.2
	 */
	activeOpacity?: number;
}

export type StyleType = (state: PressableStateCallbackType) => StyleProp<ViewStyle>;

export const PressableOpacity = forwardRef<View, PressableOpacityProps>(
	({ style, disabled = false, disabledOpacity = 0.3, activeOpacity = 0.2, ...passThroughProps }, ref) => {
		const getOpacity = useCallback(
			(pressed: boolean) => {
				if (disabled) {
					return disabledOpacity;
				}
				if (pressed) return activeOpacity;
				return 1;
			},
			[activeOpacity, disabled, disabledOpacity],
		);
		const _style = useCallback<StyleType>(
			({ pressed }) => [style as ViewStyle, { opacity: getOpacity(pressed) }],
			[getOpacity, style],
		);

		return <Pressable style={_style} disabled={disabled} {...passThroughProps} ref={ref} />;
	},
);