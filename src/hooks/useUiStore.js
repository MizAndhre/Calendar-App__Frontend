import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {
	const dispatch = useDispatch();

	const { isDateModalOpen } = useSelector((state) => state.ui);

	//used in CalendarPage
	const openDateModal = () => {
		dispatch(onOpenDateModal());
	};

	const closeDateModal = () => {
		dispatch(onCloseDateModal());
	};

	const toggleDateModal = () => {
		isDateModalOpen ? openDateModal() : closeDateModal();
	};

	return {
		//* Properties
		isDateModalOpen,

		//* Methods
		openDateModal,
		closeDateModal,
		toggleDateModal,
	};
};
