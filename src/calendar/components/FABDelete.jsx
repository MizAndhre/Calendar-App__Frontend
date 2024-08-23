//

import { useCalendarStore, useUiStore } from '../../hooks';

export const FABDelete = () => {
	const { startDeletingEvent, hasEventSelected } = useCalendarStore();
	const { isDateModalOpen } = useUiStore();

	const handleDelete = () => {
		startDeletingEvent();
	};

	return (
		<>
			{hasEventSelected && !isDateModalOpen ? (
				<button className="btn btn-danger fab-danger" onClick={handleDelete}>
					<i className="fas fa-trash-alt"></i>
				</button>
			) : (
				<></>
			)}
		</>
	);
};
