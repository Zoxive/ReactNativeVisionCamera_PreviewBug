import { create } from "zustand";
import type { Modal, ModalNames, ModalProps } from "./types";

export interface ModalStore {
	activeModal: Modal<ModalNames>[];
	setActiveModal: <T extends ModalNames>(modal: T, props: ModalProps<T>) => () => void;
	closeModal: (modal: Modal<ModalNames>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
	activeModal: [],
	setActiveModal: (modal, props) => {
		let instance: Modal<ModalNames>;

		set((s) => {
			instance = { activeModalName: modal, activeModalProps: props };

			return { activeModal: [...s.activeModal, instance] };
		});

		return () => {
			set((s) => {
				return { activeModal: s.activeModal.filter((i) => i !== instance) };
			});
		};
	},
	closeModal: (modal) => set((state) => ({ activeModal: state.activeModal.filter((m) => m !== modal) })),
}));
