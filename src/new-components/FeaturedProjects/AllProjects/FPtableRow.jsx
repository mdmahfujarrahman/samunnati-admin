import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject } from '../../../redux/api';
import DeleteModal from '../../utils/DeleteModal';

const FPtableRow = ({ index, project, allprojects, setallprojects }) => {
  console.log(project);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [ConfirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteConfirm = () => {
    setdeleteModalOpen(false);
    setConfirmDelete(true);
  };
  const handleDeleteCancel = () => {
    setdeleteModalOpen(false);
  };
  const handleDeleteproject = (e) => {
    e.preventDefault();
    setdeleteModalOpen(true);
  };
  const handleConfirmDeleteproject = async (id) => {
    try {
      const updatedprojects = allprojects.filter((b) => b._id !== id);
      setallprojects(updatedprojects);
      await deleteProject(id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (ConfirmDelete) {
      handleConfirmDeleteproject(project._id);
    }
  }, [ConfirmDelete]);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td style={{ textAlign: 'center' }}>
          <img
            src={project.image}
            height="100px"
            width="100px"
            alt="Project image"
          />
        </td>
        <td></td>
        <td className="text-right">
          <div
            className="actions"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Link to={`/featuredprojects/edit/${project._id}`}>
              {' '}
              <button className="project-edit-btn">
                <ModeEditIcon />{' '}
              </button>
            </Link>
            <Link onClick={(e) => handleDeleteproject(e)} to={'#'}>
              <button className="project-delete-btn">
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
          categorytag="Project"
        />
      )}
    </>
  );
};

export default FPtableRow;
