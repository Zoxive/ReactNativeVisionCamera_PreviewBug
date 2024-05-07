import type { registry } from "./registry";

export type ModalNames = keyof typeof registry;

export type ModalProps<T extends ModalNames> = React.ComponentProps<(typeof registry)[T]> extends infer Props
	? // biome-ignore lint/complexity/noBannedTypes: empty obj
		{} extends Props
		? undefined
		: Omit<Props, "close">
	: undefined;

export type Modal<T extends ModalNames> = {
	activeModalName: T;
	activeModalProps: ModalProps<T>;
};
