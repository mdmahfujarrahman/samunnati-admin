import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { DeleteUser, getSingleUser } from "../../../redux/api";
import DeleteModal from "../../utils/DeleteModal";
import ViewProfileModal from "../../utils/ViewProfileModal";
const UtableRow = ({
    index,
    name,
    age,
    fatherName,
    occupation,
    village,
    gotra,
    phoneNumber,
    email,
    residenceNumber,
    address,
    imgUrl,
    userId,
    setUserData,
    UserData,
}) => {
    const [deleteModalOpen, setdeleteModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [ConfirmDelete, setConfirmDelete] = useState(false);
    const [singleUserData, setSingleUserData] = useState();
    const handleDeleteConfirm = () => {
        setdeleteModalOpen(false);
        setConfirmDelete(true);
    };
    const handleDeleteCancel = () => {
        setdeleteModalOpen(false);
    };
    const handleProfileCancel = () => {
        setProfileModalOpen(false);
    };
    const handleDeleteUser = (e, id) => {
        e.preventDefault();
        setdeleteModalOpen(true);
    };
    const handleConfirmDeleteBlog = async (id) => {
        try {
            const updateUser = UserData.filter((b) => b._id !== id);
            setUserData(updateUser);
            await DeleteUser(id);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (ConfirmDelete) {
            handleConfirmDeleteBlog(userId);
        }
    }, [ConfirmDelete]);

    const handleViewProfile = async (id) => {
        if (id) {
            const userData = await getSingleUser(id);
            setSingleUserData(userData.data.result);
            setProfileModalOpen(true);
            console.log(userData.data.result);
        }
    };

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{fatherName}</td>
                <td>{occupation}</td>
                <td>{village}</td>
                <td>{gotra}</td>
                <td>{phoneNumber}</td>
                <td>{email}</td>
                <td>{residenceNumber}</td>
                <td>{address}</td>
                <td>
                    <button
                        onClick={() => handleViewProfile(userId)}
                        className="edit-btn"
                    >
                        <VisibilityIcon />{" "}
                    </button>
                    <Link to={`/user/${userId}`}>
                        <button className="edit-btn">
                            <ModeEditIcon />{" "}
                        </button>
                    </Link>
                    <button
                        onClick={(e) => handleDeleteUser(e)}
                        className="delete-btn"
                    >
                        <DeleteIcon />{" "}
                    </button>
                </td>
            </tr>
            {deleteModalOpen && (
                <DeleteModal
                    show={deleteModalOpen}
                    handleConfirm={handleDeleteConfirm}
                    handleCancel={handleDeleteCancel}
                    categorytag={name}
                />
            )}
            {profileModalOpen && (
                <ViewProfileModal
                    show={profileModalOpen}
                    handleCancel={handleProfileCancel}
                    userData={singleUserData}
                />
            )}
        </>
    );
};

export default UtableRow;
