import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getEmployeeById, updateEmployee } from '../services/api';
import EmployeeForm from '../components/employee/EmployeeForm';

const EmployeeDetail = () => {
	const { id } = useParams();
	const [employee, setEmployee] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		fetchEmployee();
	}, [id]);

	const fetchEmployee = async () => {
		const response = await getEmployeeById(id);
		setEmployee(response.data);
	};

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const handleSave = async updatedEmployee => {
		await updateEmployee(id, updatedEmployee);
		fetchEmployee();
		handleCloseModal();
	};

	return (
		<div>
			{employee ? (
				<>
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
