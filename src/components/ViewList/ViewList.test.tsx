import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewList from './ViewList';

describe('<ViewList />', () => {
    test('it should mount', () => {
        render(<ViewList />);
        const viewList = screen.getByTestId('ViewList');
        expect(viewList).toBeInTheDocument();
    });
});
