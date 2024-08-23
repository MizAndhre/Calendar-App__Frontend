import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';
import { calendarApi } from '../apis';
import { convertDates } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				//Updating event
				const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

				Swal.fire('Actualización exitosa', data.msg, 'success');

				dispatch(onUpdateEvent({ ...calendarEvent, user }));

				return;
			}

			//Creating event
			const resp = await calendarApi.post('/events', calendarEvent);
			const { data } = resp;

			dispatch(
				onAddNewEvent({
					...calendarEvent,
					id: data.event.id,
					user,
				})
			);
		} catch (error) {
			console.log(error);
			Swal.fire('Actualización fallida', error.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');

			const events = convertDates(data.events);

			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log('Error cargando eventos', error);
		}
	};

	const startDeletingEvent = async () => {
		//TODO: llegar al backend

		try {
			const { data } = await calendarApi.delete(`/events/${activeEvent.id}`, activeEvent.id);

			Swal.fire('Actualización exitosa', data.msg, 'success');

			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(error);
			Swal.fire('Actualización fallida', error.response.data.msg, 'error');
		}
	};

	return {
		//* Properties
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//* Methods
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
