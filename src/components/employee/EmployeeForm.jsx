import React, {
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeForm = forwardRef(
	({ show, handleClose, handleSave, employee }, ref) => {
		/**
		 * Hook para manejar el estado del formulario de empleado.
		 * @typedef {Object} FormData
		 * @property {string} nombre - El nombre del empleado.
		 * @property {string} apellido - El apellido del empleado.
		 * @property {string} razon_social - La razón social del empleado.
		 * @property {string} cedula - La cédula del empleado.
		 * @property {string} telefono - El teléfono del empleado.
		 * @property {string} pais - El país del empleado.
		 * @property {string} ciudad - La ciudad del empleado.
		 */
		const [formData, setFormData] = useState({
			nombre: '',
			apellido: '',
			razon_social: '',
			cedula: '',
			telefono: '',
			pais: '',
			ciudad: '',
		});

	
		const [errors, setErrors] = useState({});

		useEffect(() => {
			if (employee) {
				setFormData(employee);
			}
		}, [employee]);

		/**
		 * Maneja el evento de cambio para las entradas del formulario. Actualiza el estado del formulario.
		 *
		 * @param {Object} e - The event object.
		 */
		const handleChange = e => {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		};

		/**
		 * Valida los datos del formulario y devuelve cualquier error de validación.
		 *
		 * @returns {Object} Un objeto que contiene errores de validación, si los hay.
		 */
		const validate = () => {
			const errors = {};
			if (!formData.nombre) errors.nombre = 'El nombre es requerido';
			if (!formData.apellido) errors.apellido = 'El apellido es requerido';
			if (!formData.cedula) errors.cedula = 'La cédula es requerida';
			if (!formData.telefono) errors.telefono = 'El teléfono es requerido';
			if (!formData.pais) errors.pais = 'El país es requerido';
			if (!formData.ciudad) errors.ciudad = 'La ciudad es requerida';
			return errors;
		};

		/**
		 * Maneja el envío del formulario. Valida los datos del formulario y llama a la función de guardar si no hay errores.
		 *
		 * @param {Event} e - El evento de envío del formulario.
		 * @returns {void}
		 */
		const handleSubmit = e => {
			e.preventDefault();
			const validationErrors = validate();
			if (Object.keys(validationErrors).length === 0) {
				handleSave(formData);
			} else {
				setErrors(validationErrors);
			}
		};

		useImperativeHandle(ref, () => ({
			resetForm() {
				setFormData({
					nombre: '',
					apellido: '',
					razon_social: '',
					cedula: '',
					telefono: '',
					pais: '',
					ciudad: '',
				});
				setErrors({});
			},
		}));

		return (
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{employee ? 'Editar Empleado' : 'Crear Empleado'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type='text'
								name='nombre'
								value={formData.nombre}
								onChange={handleChange}
								isInvalid={!!errors.nombre}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.nombre}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Apellido</Form.Label>
							<Form.Control
								type='text'
								name='apellido'
								value={formData.apellido}
								onChange={handleChange}
								isInvalid={!!errors.apellido}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.apellido}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Razón Social</Form.Label>
							<Form.Control
								type='text'
								name='razon_social'
								value={formData.razon_social}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Cédula</Form.Label>
							<Form.Control
								type='text'
								name='cedula'
								value={formData.cedula}
								onChange={handleChange}
								isInvalid={!!errors.cedula}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.cedula}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								type='text'
								name='telefono'
								value={formData.telefono}
								onChange={handleChange}
								isInvalid={!!errors.telefono}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.telefono}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>País</Form.Label>
							<Form.Control
								type='text'
								name='pais'
								value={formData.pais}
								onChange={handleChange}
								isInvalid={!!errors.pais}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.pais}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Ciudad</Form.Label>
							<Form.Control
								type='text'
								name='ciudad'
								value={formData.ciudad}
								onChange={handleChange}
								isInvalid={!!errors.ciudad}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.ciudad}
							</Form.Control.Feedback>
						</Form.Group>
						<Button variant='secondary' onClick={handleClose}>
							Cerrar
						</Button>
						<Button variant='primary' type='submit'>
							Guardar Cambios
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
);

export default EmployeeForm;
