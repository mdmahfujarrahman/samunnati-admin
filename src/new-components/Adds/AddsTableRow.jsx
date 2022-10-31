import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { DeleteUser, GetSingleCompany } from "../../redux/api";
import DeleteModal from "../utils/DeleteModal";
import ViewCompany from "./ViewCompany";

const AddsTableRow = ({
    index,
    companyName,
    phoneNumber,
    email,
    ownerName,
    address,
    imgUrl,
    website,
    setAddsData,
    companyDescription,
    addsData,
    setFilterData,
    template,
    filterData,
    companyId,
}) => {
    const [deleteModalOpen, setdeleteModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [ConfirmDelete, setConfirmDelete] = useState(false);
    const [companyData, setCompanyData] = useState();

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
        if (setFilterData) {
            try {
                const updateUser = filterData?.filter((b) => b.id !== id);
                setFilterData(updateUser);
                const newData = addsData?.filter((b) => b._id !== id);
                setAddsData(newData);
                await DeleteUser(id);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const updateUser = addsData?.filter((b) => b._id !== id);
                setAddsData(updateUser);
                await DeleteUser(id);
            } catch (err) {
                console.log(err);
            }
        }
    };
    useEffect(() => {
        if (ConfirmDelete) {
            // handleConfirmDeleteBlog(userId);
        }
    }, [ConfirmDelete]);

    const handleViewCompany = async (id) => {
        if (id) {
            const companyData = await GetSingleCompany(id);
            setCompanyData(companyData.data.result);
            setProfileModalOpen(true);
        }
    };

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{companyName ? companyName : "-"}</td>
                <td>{ownerName ? ownerName : "-"}</td>
                <td>{companyDescription ? companyDescription : "-"}</td>
                <td>{phoneNumber ? phoneNumber : "-"}</td>
                <td>{email ? email : "-"}</td>
                <td>{website ? website : "-"}</td>
                <td>{address ? address : "-"}</td>
                <td>{template ? template : "-"}</td>
                <td className="action-btn">
                    <button
                        onClick={() => handleViewCompany(companyId)}
                        className="edit-btn"
                    >
                        <VisibilityIcon />{" "}
                    </button>
                    <Link to="/">
                        <button className="edit-btn">
                            <ModeEditIcon />{" "}
                        </button>
                    </Link>
                    <button
                        // onClick={(e) => handleDeleteUser(e)}
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
                    // categorytag={name}
                />
            )}
            {profileModalOpen && (
                <ViewCompany
                    show={profileModalOpen}
                    handleCancel={handleProfileCancel}
                    companyData={companyData}
                />
            )}
        </>
    );
};

export default AddsTableRow;
