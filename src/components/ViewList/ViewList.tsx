import React, {ChangeEvent, useEffect, useState} from 'react';
import "./viewList.scss";
import {useDispatch, useSelector} from "react-redux";
import {deleteAllUsersAction, findUserByNameAction, getUsersAction} from "../../actions/userActions";
import {AppDispatch, RootState} from "../../store";
import {Link} from "react-router-dom";
import {IUser} from "../../models/users";


const ViewList = () => {
    
    const [currentUser, setCurrentUser] = useState<IUser| null>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    
    const users = useSelector<RootState, IUser[]>(state => state.users);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(getUsersAction());
    }, [dispatch]);
    
    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };
    
    const refreshData = () => {
		dispatch(getUsersAction());
		setCurrentIndex(-1);
        setCurrentUser(null);
    };
    
    const setActiveUser = (user: IUser, index: number) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };
    
    const removeAllUsers = () => {
        dispatch(deleteAllUsersAction())
            .then(() => {
                refreshData();
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    const findByName = () => {
        refreshData();
            dispatch(findUserByNameAction(searchName));
    };
    
    
    return (
        <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        name="search"
                        onChange={onChangeSearchName}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
                        Search
                    </button>
                    <button className="m-4 btn btn-sm btn-danger" onClick={removeAllUsers}>
                    Remove All
                    </button>
                </div>
            </nav>
            <div className="card">
                <div className="card-body row">
                    <div className="col">
                        <div className="list-group" id="list-tab" role="tablist">
                            {users &&
                                users.map((user, index) => (
                                    <li
                                        className={
                                            'list-group-item list-group-item-action ' +
                                            (index === currentIndex ? 'active' : '')
                                        }
                                        onClick={() => setActiveUser(user, index)}
                                        key={index}
                                    >
                                        {user?.firstName} {user?.lastName}
                                    </li>
                                ))}
                        </div>
                    </div>
                    <div className="col">
                        <div className="tab-content" id="nav-tabContent">
                            {currentUser ? (
                                <div>
                                    <h4>User</h4>
                                    <div>
                                        <label>
                                            <strong>Name:</strong>
                                        </label>{' '}
                                        {currentUser.firstName} {currentUser.lastName}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Email:</strong>
                                        </label>{' '}
                                        {currentUser.email}
                                    </div>
									<div>
										<label>
											<strong>Age:</strong>
										</label>{' '}
										{currentUser.telephone}
									</div>
                                    <br></br>
                                    <Link to={'/edit/' + currentUser.id} className="btn btn-outline-secondary">
                                        Edit
                                    </Link>
                                </div>
                            ) : (
                                <div className="alert alert-primary align-items-center" role="alert">
									Please click on a User...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewList;
