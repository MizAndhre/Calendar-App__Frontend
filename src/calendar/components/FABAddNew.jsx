//

import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FABAddNew = () => {
	const { openDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const handleClickNew = () => {
		setActiveEvent({
			title: '',
			notes: '',
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: '#e1e1',
			user: {
				_id: '',
				name: '',
			},
		});

		openDateModal();
	};

	return (
		<>
			<button className="btn btn-primary fab" onClick={handleClickNew}>
				<i className="fas fa-plus"></i>
			</button>
		</>
	);
};
