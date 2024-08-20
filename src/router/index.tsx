import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

const AppRouter: React.FC = () => {
	const pathToComponentMap = useMemo(() => {
		return routes.reduce(
			(a, x) => {
				a[x.path] = x.component;
				return a;
			},
			{} as Record<string, React.FC>,
		);
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				{Object.entries(pathToComponentMap).map(([path, Component]) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
