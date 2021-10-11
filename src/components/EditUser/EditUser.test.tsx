import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditUser from './EditUser';
const routeComponentPropsMock = {
	history: {} as any,
	location: {} as any,
	match: {} as any,
};

describe('<EditUser/>', () => {
    test('it should mount', () => {
        render(<EditUser {...routeComponentPropsMock}/>);
        const editUser = screen.getByTestId('EditUser');
        expect(editUser).toBeInTheDocument();
    });
});
