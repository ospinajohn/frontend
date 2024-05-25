import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Add the missing import statement for Link
import { Button } from 'react-bootstrap';
import { getEmployeeById, updateEmployee } from '../services/api';
import EmployeeForm from '../components/employee/EmployeeForm';

const EmployeeDetail = () => {
	const { id } = useParams(); // Recibe el id del empleado desde la URL
	const [employee, setEmployee] = useState(null); // Agrega el estado para almacenar el empleado
	const [showModal, setShowModal] = useState(false); // Agrega el estado para mostrar/ocultar el modal

	useEffect(() => {
		fetchEmployee();
	}, [id]);

	/**
	 * Obtiene un empleado por ID y establece los datos del empleado.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando se establecen los datos del empleado.
	 */
	const fetchEmployee = async () => {
		const response = await getEmployeeById(id);
		setEmployee(response.data);
	};

	const handleShowModal = () => setShowModal(true); // Muestra el modal
	const handleCloseModal = () => setShowModal(false); // Oculta el modal

/**
 * Guarda los datos actualizados del empleado. 
 *
 * @param {Object} updatedEmployee - Los datos actualizados de los empleados.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se actualiza el empleado.
 */
	const handleSave = async updatedEmployee => {
		await updateEmployee(id, updatedEmployee);
		fetchEmployee();
		handleCloseModal();
	};

	return (
		<div className='container mt-5 align-self-center'>
			{employee ? (
				<>
					<Link to='/' className='btn btn-primary'>
						Home
					</Link>

					<h1>Employee Detail</h1>
					<p>
						<strong>Nombre:</strong> {employee.nombre}
					</p>
					<p>
						<strong>Apellido:</strong> {employee.apellido}
					</p>
					<p>
						<strong>Razón Social:</strong> {employee.razon_social}
					</p>
					<p>
						<strong>Cédula:</strong> {employee.cedula}
					</p>
					<p>
						<strong>Teléfono:</strong> {employee.telefono}
					</p>
					<p>
						<strong>País:</strong> {employee.pais}
					</p>
					<p>
						<strong>Ciudad:</strong> {employee.ciudad}
					</p>
					<Button variant='primary' onClick={handleShowModal}>
						Editar Empleado
					</Button>

					<EmployeeForm
						show={showModal}
						handleClose={handleCloseModal}
						handleSave={handleSave}
						employee={employee}
					/>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default EmployeeDetail;
