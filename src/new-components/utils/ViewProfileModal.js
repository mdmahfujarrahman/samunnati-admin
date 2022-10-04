import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import noImage from "../../images/no image.png";
import { Show } from "./Show";

const ViewProfileModal = ({
    show,
    handleConfirm,
    userData,
    handleCancel,
    categorytag,
}) => {
    const [language,  setLanguage] = useState(false);
    const { userInfoEng, userInfoHindi } = userData;
    return (
        <>
            <Modal
                show={show}
                onHide={handleCancel}
                size="md"
                className="profile-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div>
                        <div className="toggle-container">
                            <p>
                                {language
                                    ? userInfoHindi.name
                                    : userInfoEng.name}
                            </p>
                            <div className="toggle-btn">
                                <label
                                    className={language ? "" : "toggle-color"}
                                    for="flexSwitchCheckChecked"
                                >
                                    English
                                </label>
                                <div className="form-check form-switch form-switch-xl">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(e) =>
                                            setLanguage(e.target.checked)
                                        }
                                        id="flexSwitchCheckChecked"
                                    />
                                    <label
                                        className={
                                            language ? "toggle-color" : ""
                                        }
                                        for="flexSwitchCheckChecked"
                                    >
                                        हिन्दी
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="profile-img">
                            <div className="img-container">
                                <img
                                    src={
                                        userInfoEng.imgUrl
                                            ? userInfoEng.imgUrl
                                            : noImage
                                    }
                                    alt={userInfoEng.name}
                                />
                            </div>
                        </div>
                        <Show condition={!language}>
                            <div className="row profile-content">
                                <div className="col-6">
                                    <p>Name:</p>
                                    <p>Age:</p>
                                    <p>Father's Name:</p>
                                    <p>Occupation:</p>
                                    <p>Village:</p>
                                    <p>Gotra:</p>
                                    <p>Mobile Number:</p>
                                    <p>Residence Number:</p>
                                    <p>Email:</p>
                                    <p>Address:</p>
                                </div>
                                <div className="col-6">
                                    <p>{userInfoEng.name}</p>
                                    <p>{userInfoEng.age}</p>
                                    <p>{userInfoEng.fatherName}</p>
                                    <p>{userInfoEng.occupation}</p>
                                    <p>{userInfoEng.village}</p>
                                    <p>{userInfoEng.gotra}</p>
                                    <p>{userInfoEng.phoneNumber}</p>
                                    <p>{userInfoEng.residenceNumber}</p>
                                    <p>{userInfoEng.email}</p>
                                    <p>{userInfoEng.address}</p>
                                </div>
                            </div>
                        </Show>
                        <Show condition={language}>
                            <div className="row profile-content">
                                <div className="col-6">
                                    <p>Name:</p>
                                    <p>Age:</p>
                                    <p>Father's Name:</p>
                                    <p>Occupation:</p>
                                    <p>Village:</p>
                                    <p>Gotra:</p>
                                    <p>Mobile Number:</p>
                                    <p>Residence Number:</p>
                                    <p>Email:</p>
                                    <p>Address:</p>
                                </div>
                                <div className="col-6">
                                    <p>{userInfoHindi.name}</p>
                                    <p>{userInfoHindi.age}</p>
                                    <p>{userInfoHindi.fatherName}</p>
                                    <p>{userInfoHindi.occupation}</p>
                                    <p>{userInfoHindi.village}</p>
                                    <p>{userInfoHindi.gotra}</p>
                                    <p>{userInfoHindi.phoneNumber}</p>
                                    <p>{userInfoHindi.residenceNumber}</p>
                                    <p>{userInfoHindi.email}</p>
                                    <p>{userInfoHindi.address}</p>
                                </div>
                            </div>
                        </Show>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ViewProfileModal;
