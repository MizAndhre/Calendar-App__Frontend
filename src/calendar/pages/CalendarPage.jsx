import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesES } from '../../helpers';
import { CalendarEventBox, CalendarModal, FABAddNew, FABDelete, Navbar } from '../';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
	const { user } = useAuthStore();
	const { openDateModal } = useUiStore();
	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

	const eventStyleGetter = (event, start, end, isSelected) => {
		const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid;

		const style = {
			backgroundColor: isMyEvent ? '#347CF7' : '#465660',
			borderRadius: '0px',
			opacity: isSelected ? 1 : 0.7,
			color: 'white',
		};

		return { style };
	};

	const handleDoubleClick = () => {
		openDateModal();
	};
	const handleSelect = (event) => {
		setActiveEvent(event);
	};

	const handleViewChanged = (event) => {
		localStorage.setItem('lastView', event);
	};

	useEffect(() => {
		startLoadingEvents();
	}, []);

	return (
		<>
			<Navbar />

			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				//vista por defecto
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				//modificar el tamaño/style del calendario
				style={{ height: 'calc(100vh - 80px' }}
				//agregar mensajes en español
				messages={getMessagesES()}
				// cambiar el estilo del evento
				eventPropGetter={eventStyleGetter}
				//cambiar el contenido del evento
				components={{
					event: CalendarEventBox,
				}}
				//eventos
				onDoubleClickEvent={handleDoubleClick}
				onSelectEvent={handleSelect}
				onView={handleViewChanged}
			/>

			<CalendarModal />
			<FABAddNew />
			<FABDelete />
		</>
	);
};
