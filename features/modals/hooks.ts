import { useCallback } from "react";
import { useModalStore } from "./store";
import type { ModalNames, ModalProps } from "./types";

export function useModal<T extends ModalNames>(modal: T, props: ModalProps<T>, deps: unknown[]) {
	const setActiveModal = useModalStore((state) => state.setActiveModal);
	// biome-ignore lint/correctness/useExhaustiveDependencies: ignore props, we watch it via deps
	return useCallback(() => setActiveModal(modal, props), [setActiveModal, modal, ...(deps ?? [])]);
}