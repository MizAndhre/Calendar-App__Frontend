import { useEffect, useMemo, useState } from 'react';

import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { es } from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
registerLocale('es', es);

//estilos del Modal
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
Modal.setAppElement('#root');

const formData = {
	title: '',
	notes: '',
	start: new Date(),
	end: addHours(new Date(), 4),
};

export const CalendarModal = () => {
	const { isDateModalOpen, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent } = useCalendarStore();

	const [formSubmitted, setFormSubmitted] = useState(false);

	const [formValues, setFormValues] = useState(formData);

	const titleClass = useMemo(() => {
		if (!formSubmitted) return '';

		return formValues.title.trim().length > 0 ? 'is-valid' : 'is-invalid';
	}, [formValues.title, formSubmitted]);

	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({ ...activeEvent });
		}
	}, [activeEvent]);

	const handleInputChange = (event) => {
		const { target } = event;

		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const handleDateChange = (event, changing = '') => {
		setFormValues({
			...formValues,
			[changing]: event,
		});
	};

	const handleCloseModal = () => {
		closeDateModal();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setFormSubmitted(true);

		const difference = differenceInSeconds(formValues.end, formValues.start);

		if (isNaN(difference) || difference < 0) {
			Swal.fire('Fechas incorrectas', 'Revisa las fechas ingresadas', 'error');
			return;
		}

		if (formValues.title.trim().length <= 0) return;

		//TODO:
		await startSavingEvent(formValues);
		closeDateModal();
		setFormSubmitted(false);
	};

	return (
		<>
			<Modal
				isOpen={isDateModalOpen}
				onRequestClose={handleCloseModal}
				style={customStyles}
				className="modal"
				overlayClassName="modal-fondo"
				closeTimeoutMS={200}>
				{/* Contenido */}
				<h1> Nuevo evento </h1>
				<hr />
				<form className="container" onSubmit={handleSubmit}>
					<div className="form-group mb-2">
						<label className="d-block">Fecha y hora de inicio</label>

						<DatePicker
							selected={formValues.start}
							className="form-control"
							dateFormat="Pp"
							showTimeSelect
							locale="es"
							timeCaption="Hora"
							onChange={(event) => handleDateChange(event, 'start')}
						/>
					</div>

					<div className="form-group mb-2">
						<label className="d-block">Fecha y hora de fin</label>
						<DatePicker
							minDate={formValues.start}
							selected={formValues.end}
							className="form-control"
							dateFormat="Pp"
							showTimeSelect
							locale="es"
							timeCaption="Hora"
							onChange={(event) => handleDateChange(event, 'end')}
						/>
					</div>

					<hr />
					<div className="form-group mb-2">
						<label>Titulo y notas</label>
						<input
							type="text"
							className={`form-control ${titleClass}`}
							placeholder="Título del evento"
							autoComplete="off"
							name="title"
							value={formValues.title}
							onChange={handleInputChange}
						/>
						<small id="emailHelp" className="form-text text-muted">
							Una descripción corta
						</small>
					</div>

					<div className="form-group mb-2">
						<textarea
							type="text"
							className="form-control"
							placeholder="Notas"
							rows="5"
							name="notes"
							value={formValues.notes}
							onChange={handleInputChange}></textarea>
						<small id="emailHelp" className="form-text text-muted">
							Información adicional
						</small>
					</div>

					<button type="submit" className="btn btn-outline-primary btn-block">
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
				</form>
			</Modal>
		</>
	);
};
