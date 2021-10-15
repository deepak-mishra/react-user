import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditUser from './EditUser';
import {Provider} from "react-redux";
import store from "../../store";
const routeComponentPropsMock = {
    history: {} as any,
    location: {} as any,
    match: {
        params: {
            id: '1',
        },
    } as any,
};

describe('<EditUser/>', () => {
    test('it should mount', () => {
		render(
			<Provider store={store}>
				<EditUser {...routeComponentPropsMock}/>
			</Provider>
		);
        const editUser = screen.getByText(/Edit User/i);
        expect(editUser).toBeInTheDocument();
    });
});
