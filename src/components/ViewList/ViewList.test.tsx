import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewList from './ViewList';
import store from "../../store";
import {Provider} from "react-redux";
import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const handlers = [
    rest.get('http://localhost:3001/api/users', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: '2',
                    firstName: 'Hermann',
                    lastName: 'Daniel',
                    telephone: 812381238123,
                    email: 'hd@bla.de',
                },
                {
                    id: '1',
                    firstName: 'Rhea',
                    lastName: 'McLaughlin',
                    telephone: 8000000000,
                    email: 'sunt@bla.de',
                },
            ]),
            ctx.delay(0)
        );
    }),
	rest.delete('http://localhost:3001/api/user', (req, res, ctx) => {
		return res(
			ctx.json([]),
			ctx.delay(0)
		);
	}),
	rest.get('http://localhost:3001/api/user', (req, res, ctx) => {
		return res(
			ctx.json([]),
			ctx.delay(0)
		);
	}),
];

const server = setupServer(...handlers);

describe('<ViewList />', () => {
	beforeAll(() => server.listen());
	
	beforeEach( ()=>{
		render(
			<Provider store={store}>
				<ViewList />
			</Provider>
		);
	});
	
    it('it should mount', () => {
        const viewList = screen.getByText(/Search/i);
        expect(viewList).toBeInTheDocument();
    });
	
	
	it('should show user list', async () => {
		expect(screen.queryByText(/Please click on a User/i)).toBeInTheDocument();
		expect(await screen.findByText(/McLaughlin/i)).toBeInTheDocument();
	});
	
	it('should show empty user screen', async () => {
		expect(screen.queryByText(/Please click on a User/i)).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: /Remove All/i }));
		expect(await screen.findByText(/Rhea/i)).not.toBeInTheDocument();
	});
	
	afterEach(() => server.resetHandlers());
	
	afterAll(() => server.close());
});
