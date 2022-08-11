import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProperty } from '../../../redux/api';
import DeleteModal from '../../utils/DeleteModal';
const PtableRow = ({ index, property, allproperty, setallproperty }) => {
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [ConfirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteConfirm = () => {
    setdeleteModalOpen(false);
    setConfirmDelete(true);
  };
  const handleDeleteCancel = () => {
    setdeleteModalOpen(false);
  };
  const handleDeleteProperty = (e) => {
    e.preventDefault();
    setdeleteModalOpen(true);
  };
  const handleConfirmDeleteProperty = async (id) => {
    try {
      const updatedproperty = allproperty.filter((b) => b._id !== id);
      setallproperty(updatedproperty);
      await deleteProperty(id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (ConfirmDelete) {
      handleConfirmDeleteProperty(property._id);
    }
  }, [ConfirmDelete]);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{property.name}</td>
        <td>{property.location}</td>
        <td>{property.area}</td>
        <td>{property.ready ? 'Yes' : 'No'}</td>
        <td>{property.unitsLeft}</td>
        <td>{property.price}</td>
        <td style={{ textAlign: 'center' }}>
          <Link to={`/property/viewdev/${property._id}`}>
            <button className="btn btn-outline-secondary btn-sm">View</button>
          </Link>
        </td>
        <td className="text-right">
          <div
            className="actions"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Link to={`/property/edit/${property._id}`}>
              {' '}
              <button className="edit-btn">
                <ModeEditIcon />{' '}
              </button>
            </Link>
            <Link onClick={(e) => handleDeleteProperty(e)} to={'#'}>
              <button className="delete-btn">
                <DeleteIcon />{' '}
              </button>
            </Link>
          </div>
        </td>
      </tr>
      {deleteModalOpen && (
        <DeleteModal
          show={deleteModalOpen}
          handleConfirm={handleDeleteConfirm}
          handleCancel={handleDeleteCancel}
          categorytag="Property"
        />
      )}
    </>
  );
};

export default PtableRow;
