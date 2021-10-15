import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect';
import AddUser from './AddUser';
import {Provider} from "react-redux";
import store from "../../store";

export const handlers = [
	rest.post('http://localhost:3001/api/user', (req, res, ctx) => {
		return res(ctx.json({
			"id": "2",
			"firstName": "Hermann",
			"lastName": "Daniel",
			"telephone": 812381238123,
			"email": "hd@bla.de"
		}), ctx.delay(0))
	})
];

const server = setupServer(...handlers);

describe('<AddUser />', () => {
	
	beforeAll(() => server.listen());

	beforeEach( ()=>{
		render(
			<Provider store={store}>
				<AddUser />
			</Provider>
		);
	});
	
    it('should mount', () => {
        const addUser =  screen.getByText(/Add User/i);
		expect(addUser).toBeInTheDocument();
    });
	
	
	it('should show user added successfully screen', async() => {
		expect(screen.queryByText(/Add Another/i)).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
		expect(await screen.findByText(/You submitted successfully!/i)).toBeInTheDocument();
	});
	
	afterEach(() => server.resetHandlers());
	
	afterAll(() => server.close());
    
});
