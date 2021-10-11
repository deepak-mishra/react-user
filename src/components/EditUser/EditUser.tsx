import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { IUser } from '../../models/users';
import UserService from '../../services/UserService';
import { RouteComponentProps } from 'react-router';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {createUserAction, deleteUserAction, updateUserAction} from "../../actions/userActions";

interface RouterProps {
    id: string;
}
type Props = RouteComponentProps<RouterProps>;

const EditUser: React.FC<Props> = (props: Props): ReactElement => {
    const initialUserState: IUser = {
		id: '',
		firstName: '',
		lastName: '',
		telephone: 0,
		email: '',
    };
	const dispatch = useDispatch<AppDispatch>();
    const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);
    const [message, setMessage] = useState<string>('');

    const getUser = (id: string) => {
        UserService.get(id)
            .then((response) => {
                setCurrentUser(response.data[0]);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const update = () => {
        dispatch(updateUserAction(currentUser.id, currentUser))
            .then((response: IUser) => {
                setMessage('The user was updated successfully!');
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        dispatch(deleteUserAction(currentUser.id))
            .then((response) => {
                props.history.push('/view');
            })
            .catch((e) => {
                console.log(e);
            });
    };
    
    return (
        <div className="card">
            <div className="card-header">Edit User</div>
            {currentUser ? (
                <div>
                    {message && <p className="alert alert-primary align-items-center">{message}</p>}
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={currentUser.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
						<div className="mb-3">
							<label htmlFor="name">Last Name</label>
							<input
								type="text"
								className="form-control"
								id="lastName"
								name="lastName"
								value={currentUser.lastName}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
                            <label htmlFor="age">Telephone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="telephone"
                                required
                                value={currentUser.telephone}
                                onChange={handleInputChange}
                                name="age"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={currentUser.email}
                                onChange={handleInputChange}
                                name="email"
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={deleteUser} className="btn btn-danger ">
                            Delete
                        </button>&nbsp;
                        <button type="submit" className="btn btn-primary" onClick={update}>
                            Update
                        </button>
                    </div>
                </div>
            ) : (
                <div className="alert alert-primary align-items-center">
                    <p>Select User...</p>
                </div>
            )}
        </div>
    );
};

export default EditUser;
