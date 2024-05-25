import React, {
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeForm = forwardRef(
	({ show, handleClose, handleSave, employee }, ref) => {
		const [formData, setFormData] = useState({
			nombre: '',
			apellido: '',
			razon_social: '',
			cedula: '',
			telefono: '',
			pais: '',
			ciudad: '',
		});

		useEffect(() => {
			if (employee) {
				setFormData(employee);
			}
		}, [employee]);

		const handleChange = e => {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		};

		const handleSubmit = () => {
			handleSave(formData);
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
			},
		}));

		return (
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{employee ? 'Edit Employee' : 'Create Employee'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type='text'
								name='nombre'
								value={formData.nombre}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Apellido</Form.Label>
							<Form.Control
								type='text'
								name='apellido'
								value={formData.apellido}
								onChange={handleChange}
							/>
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
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								type='text'
								name='telefono'
								value={formData.telefono}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>País</Form.Label>
							<Form.Control
								type='text'
								name='pais'
								value={formData.pais}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Ciudad</Form.Label>
							<Form.Control
								type='text'
								name='ciudad'
								value={formData.ciudad}
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
);

export default EmployeeForm;
