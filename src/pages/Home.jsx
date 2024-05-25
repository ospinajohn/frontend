import React, { useState, useEffect, useRef } from 'react';
import ListEmployees from '../components/employee/EmployeeList';
import EmployeeForm from '../components/employee/EmployeeForm';
import { Button } from 'react-bootstrap';
import { createEmployee, getEmployees } from '../services/api';
import Swal from 'sweetalert2';

const Home = () => {
	const [show, setShow] = useState(false);
	const [employees, setEmployees] = useState([]); // Agrega el estado para almacenar los empleados
	const modalRef = useRef();

	const handleShow = () => setShow(true); // Muestra el modal
	const handleClose = () => setShow(false); // Oculta el modal

	useEffect(() => {
		fetchEmployees();
	}, []);

	const fetchEmployees = async () => {
		const response = await getEmployees();
		setEmployees(response.data);
	};

	const handleSave = async employee => {
		try {
			const response = await createEmployee(employee);
			if (response.status === 201) {
				Swal.fire('Empleado creado', '', 'success');
				fetchEmployees();
				modalRef.current.resetForm(); // Limpiar el formulario
				handleClose();
			} else {
				Swal.fire('Error', 'Ha ocurrido un error', 'error');
			}
		} catch (error) {
			if (error.response) {
				Swal.fire(
					'Error',
					error.response.data.message || 'Ha ocurrido un error',
					'error'
				);
			} else {
				Swal.fire('Error', 'Error al enviar la solicitud', 'error');
			}
		}
	};

	return (
		<div className='container'>
			<h1 className='text-center'>Home</h1>
			<Button variant='primary' onClick={handleShow}>
				Create Employee
			</Button>
			<EmployeeForm
				ref={modalRef}
				show={show}
				handleClose={handleClose}
				handleSave={handleSave}
			/>
			<ListEmployees employees={employees} />
		</div>
	);
};

export default Home;
