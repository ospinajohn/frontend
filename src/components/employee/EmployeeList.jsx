import React, { useState, useEffect } from 'react';
import { deleteEmployee, getEmployees } from '../../services/api';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListEmployees = ({ employees }) => {
	const handleDelete = async id => {
		Swal.fire({
			title: 'Desear eliminar el empleado?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'si',
			denyButtonText: `No`,
		}).then(async result => {
			if (result.isConfirmed) {
				await deleteEmployee(id);
				Swal.fire('Empleado eliminado', '', 'success');
			
        
			} else if (result.isDenied) {
				Swal.fire('Los cambios no se guardan', '', 'info');
			}
		});
	};

	return (
		<div className='mt-5 align-self-center'>
			<h2>Employees List</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Razon Social</th>
						<th>Cedula</th>
						<th>Telefono</th>
						<th>Pais</th>
						<th>Ciudad</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{employees.map(employee => (
						<tr key={employee.id}>
							<td>{employee.nombre}</td>
							<td>{employee.apellido}</td>
							<td>{employee.razon_social}</td>
							<td>{employee.cedula}</td>
							<td>{employee.telefono}</td>
							<td>{employee.pais}</td>
							<td>{employee.ciudad}</td>
							<td>
								<button
									onClick={() => handleDelete(employee.id)}
									className='btn btn-danger mr-2'>
									Delete
								</button>

								<Link
									to={`/employees/${employee.id}/edit`}
									className='btn btn-primary mr-2'>
									Edit
								</Link>

								<Link to={`/employees/${employee.id}`} className='btn btn-info'>
									View
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default ListEmployees;
