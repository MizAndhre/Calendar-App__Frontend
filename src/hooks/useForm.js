import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);

	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {
		for (const formValue in formValidation) {
			if (formValidation[formValue] !== null) return false;
		}
		return true;
	}, [formValidation]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleResetForm = () => {
		setFormState(initialForm);
	};

	const createValidators = () => {
		const formCheckedValues = {};

		for (const formField of Object.keys(formValidations)) {
			// * otra forma => for (const key in formValidations) {
			const [fn, errorMessage] = formValidations[formField];

			formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
		}

		setFormValidation(formCheckedValues);
	};

	return {
		...formState,
		formState,
		handleInputChange,
		handleResetForm,
		...formValidation,
		formValidation,
		isFormValid,
	};
};
