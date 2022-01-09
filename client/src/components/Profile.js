import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { BiImageAdd } from 'react-icons/bi';
import { BASE_URL, updataUserData, uploadImage } from '../utils/api';
import { updateAuthedUserAction } from '../redux/actions/authedUser';
import defaultImage from '../assets/images/default_user_image.png';


const Profile = (props) => {

    const { authedUser, dispatch } = props;
    const [sucess, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const inputFile = useRef(null);

    useEffect(() => {
        setName(authedUser.data.user.name);
        setEmail(authedUser.data.user.email);
        setAddress(authedUser.data.user.address);
    }, [authedUser.data.user.address, authedUser.data.user.email, authedUser.data.user.name])

    const handleUploadImageClick = () => {
        inputFile.current.click();
    }

    const handleUploadImage = (e) => {
        const imageFile = e.target.files[0];
        const id = authedUser.data.user._id;
        uploadImage(id, imageFile).then(res => {
            dispatch(updateAuthedUserAction(res));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        });
    }

    const handleOnCloseDialog = () => {
        setName(authedUser.data.user.name);
        setEmail(authedUser.data.user.email);
        setAddress(authedUser.data.user.address);
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'name': {
                setName(e.target.value);
                break;
            }
            case 'email': {
                setEmail(e.target.value);
                break;
            }
            case 'address': {
                setAddress(e.target.value);
                break;
            }
            default:
                break;
        }
    }

    const handleUpdateData = () => {
        const id = authedUser.data.user._id;
        updataUserData(id, {
            name,
            email,
            address
        }).then(res => {
            dispatch(updateAuthedUserAction(res));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }).catch(e => {
            alert(e.message);
        })
    }

    return (
        <div className='app-font'>
            {sucess &&
                <div class="p-2 alert alert-success" role="alert">
                    Your Data Updated Successfully
                </div>
            }
            <div className='main-profile'>
                <button className='btn-none edit-profile' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Your Profile</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update your data</h5>
                                <button onClick={handleOnCloseDialog} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex flex-column gap-3">
                                <input
                                    onChange={handleInputChange}
                                    value={name}
                                    className='form-control'
                                    name="name"
                                    type="text"
                                    placeholder="Mahmoud M."
                                />

                                <input
                                    onChange={handleInputChange}
                                    value={email}
                                    className='form-control'
                                    name="email"
                                    type="text"
                                    placeholder="example@gmail.com"
                                />

                                <input
                                    onChange={handleInputChange}
                                    value={address}
                                    className='form-control'
                                    name="address"
                                    type="text"
                                    placeholder="22 st Cairo, Egypt"
                                />
                            </div>
                            <div class="modal-footer">
                                <button onClick={handleOnCloseDialog} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                    data-bs-dismiss="modal"
                                    onClick={handleUpdateData}
                                    type="button"
                                    class="btn btn-dark">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    accept='image/x-png,image/jpeg'
                    onChange={handleUploadImage}
                    type='file'
                    name='file'
                    ref={inputFile}
                    style={{ display: 'none' }} />
                <div className='profile-img-container'>
                    <button onClick={handleUploadImageClick} className='btn-none profile-img-shadow'>
                        <BiImageAdd color='#eeeeee' size={36} />
                    </button>
                    <img className='fit-image profile-img' src={(authedUser.data.user.imgUrl !== null ? (BASE_URL + authedUser.data.user.imgUrl) : defaultImage)} alt='test' width='250px' height="250px" />
                </div>
                <div className='profile-details-container'>
                    <span className='profile-details-title'>Details</span>
                    <span className='value-title'>Name :</span>
                    <span className='profile-details-name'>{authedUser.data.user.name}</span>
                    <span className='value-title'>Email :</span>
                    <span className='profile-details-name'>{authedUser.data.user.email}</span>
                    <span className='value-title'>Address :</span>
                    <span className='profile-details-name'>{authedUser.data.user.address}</span>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Profile);