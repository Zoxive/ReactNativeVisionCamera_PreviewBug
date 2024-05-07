import { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { RegistryRender } from "./registry";
import { useModalStore } from "./store";
import { useBackButtonListener } from "../../shared/hooks";

export function ModalRoot() {
	const activeModal = useModalStore((state) => state.activeModal[state.activeModal.length - 1]);
	const close = useModalStore((s) => s.closeModal);
	const closeModal = useCallback(() => {
		if (activeModal) {
			close(activeModal);
			return true;
		}
		return false;
	}, [activeModal, close]);

	useBackButtonListener(() => {
		return closeModal();
	}, [closeModal]);

	if (!activeModal) {
		return null;
	}

	const child = RegistryRender(activeModal, closeModal);

	return (
		<>
			<Pressable onPress={closeModal} style={StyleSheet.absoluteFill} />
			{child}
		</>
	);
}
