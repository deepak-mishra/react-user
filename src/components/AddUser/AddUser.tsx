import React, { ChangeEvent, ReactElement, useState } from 'react';
import './AddUser.scss';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../../actions/userActions';
import { AppDispatch } from '../../store';
import { IUser } from '../../models/users';

const AddUser: React.FC = (): ReactElement => {
    const initialUserState: IUser = {
        id: '',
        firstName: '',
        lastName: '',
        telephone: 0,
        email: '',
    };

    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        dispatch(createUserAction(user))
            .then((data: IUser) => {
                setUser({
                    id: data.id,
					firstName: data.firstName,
					lastName:data.lastName,
					telephone: data.telephone,
                    email: data.email,
                    
                });
                setSubmitted(true);
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };

    return (
        <div className="card">
            <div className="card-header">Add User</div>
            {submitted ? (
                <div className="card-body">
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Add Another
                    </button>
                </div>
            ) : (
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            required
                            value={user.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                        />
                    </div>
					<div className="mb-3">
						<label htmlFor="name">Last Name</label>
						<input
							type="text"
							className="form-control"
							id="lastName"
							required
							value={user.lastName}
							onChange={handleInputChange}
							name="lastName"
						/>
					</div>
                    <div className="mb-3">
                        <label htmlFor="age">Telephone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telephone"
                            required
                            value={user.telephone}
                            onChange={handleInputChange}
                            name="telephone"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={user.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>
                    <button onClick={saveUser} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
