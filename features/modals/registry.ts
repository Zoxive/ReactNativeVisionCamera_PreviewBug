import { createElement } from "react";
import { ViewPicture } from "../../app/ViewPicture";
import type { Modal, ModalNames } from "./types";
import { Text } from "react-native";

export const registry = {
	ViewPicture: ViewPicture,
	// biome-ignore lint/correctness/noChildrenProp: <explanation>
	TextExample: () => createElement(Text, { children: "Empty Text" }),
} as const;

export function RegistryRender<T extends ModalNames>(value: Modal<T>, close: () => void) {
	// biome-ignore lint/suspicious/noExplicitAny: TODO try getting this to work with generics.. we should know the Props via ModalProps<T>
	const Component = registry[value.activeModalName] as React.ComponentType<any>;
	const props = value.activeModalProps;

	if (props == null || props === undefined) {
		return createElement(Component, { close });
	}

	return createElement(Component, { ...(props as object), close });
}
