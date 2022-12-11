import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, userFixture } from '../utils/test-utils';
import { EditUserModal } from './edit-user-modal';

describe('EditUserModal', ()=>{
    const handleSubmit = jest.fn();
    const onClose = jest.fn();
    const selectedUser = userFixture;

    it('Does not display the modal data when the modal is not open', () => {
        render(<EditUserModal isOpen={false} handleSubmit={handleSubmit} onClose={onClose} selectedUser={selectedUser} />)
        expect(screen.queryByText('Edit user')).not.toBeInTheDocument();
    })

    it('Displays input fields for user data with the current data as default', () => {
        render(<EditUserModal isOpen handleSubmit={handleSubmit} onClose={onClose} selectedUser={selectedUser} />)
        expect(screen.getByDisplayValue(userFixture.email)).toBeInTheDocument();
        expect(screen.getByDisplayValue(userFixture.first_name)).toBeInTheDocument();
        expect(screen.getByDisplayValue(userFixture.last_name)).toBeInTheDocument();
    })

    it('Submits the form data and closes the modal when the Save Changes button is clicked', async () => {
        const newData = {
            email: 'some@email.com',
            first_name: 'some',
            last_name: 'name'
        };
        const user = userEvent.setup()
        
        render(<EditUserModal isOpen handleSubmit={handleSubmit} onClose={onClose} selectedUser={selectedUser} />)
        
        await user.clear(screen.getByLabelText('Email:'));
        await user.clear(screen.getByLabelText('First name:'));
        await user.clear(screen.getByLabelText('Last name:'));
        await user.type(screen.getByLabelText('Email:'), newData.email);
        await user.type(screen.getByLabelText('First name:'), newData.first_name);
        await user.type(screen.getByLabelText('Last name:'), newData.last_name);
        await user.click(screen.getByText('Save changes'));

        expect(handleSubmit).toHaveBeenCalledWith(newData);
        expect(onClose).toHaveBeenCalled();
    })
})