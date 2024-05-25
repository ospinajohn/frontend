import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ListEmployees from '../components/employee/EmployeeList';
import EmployeeDetail from '../pages/EmployeeDetail';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},

	{
		path: '/employees',
		element: <ListEmployees />,
	},

	{
		path: '/employees/:id',
		element: <EmployeeDetail />,
	},
]);

const Routes = () => {
	return <RouterProvider router={router} />;
};

export default Routes;
