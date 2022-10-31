import React from "react";
const AVtableRow = () => {
    // const [deleteModalOpen, setdeleteModalOpen] = useState(false);
    // const [ConfirmDelete, setConfirmDelete] = useState(false);
    // const handleDeleteConfirm = () => {
    //   setdeleteModalOpen(false);
    //   setConfirmDelete(true);
    // };
    // const handleDeleteCancel = () => {
    //   setdeleteModalOpen(false);
    // };
    // const handleDeleteProperty = (e) => {
    //   e.preventDefault();
    //   setdeleteModalOpen(true);
    // };
    // const handleConfirmDeleteProperty = async (id) => {
    //   try {
    //     const updatedproperty = allproperty.filter((b) => b._id !== id);
    //     setallproperty(updatedproperty);
    //     await deleteProperty(id);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // useEffect(() => {
    //   if (ConfirmDelete) {
    //     handleConfirmDeleteProperty(property._id);
    //   }
    // }, [ConfirmDelete]);

    return (
        <>
            <tr>
                <td>1</td>
                <td>New</td>
                <td>ok</td>
                <td>Ghazibad</td>
                {/* <td style={{ textAlign: 'center' }}>
          {property.unitDetails.length ? (
            <Link to={`#`}>
              <button className="btn btn-outline-secondary btn-sm">View</button>
            </Link>
          ) : (
            <Link to={`#`}>
              <button type="button" className="btn btn-outline-success btn-sm">
                Add
              </button>
            </Link>
          )}
        </td>
        <td style={{ textAlign: 'center' }}>
          {property.developer ? (
            <Link to={`#`}>
              <button className="btn btn-outline-secondary btn-sm">Edit</button>
            </Link>
          ) : (
            <Link to={`#`}>
              <button type="button" className="btn btn-outline-success btn-sm">
                Add
              </button>
            </Link>
          )}
        </td>
        <td className="text-right">
          <div
            className="actions"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Link to={'#'}>
              {' '}
              <button className="edit-btn">
                <ModeEditIcon />{' '}
              </button>
            </Link>
            <Link  to={'#'}>
              <button className="delete-btn">
                <DeleteIcon />{' '}
              </button>
            </Link>
          </div>
        </td> */}
            </tr>
            {/* {deleteModalOpen && (
        <DeleteModal
          show={deleteModalOpen}
          handleConfirm={handleDeleteConfirm}
          handleCancel={handleDeleteCancel}
          categorytag="Property"
        />
      )} */}
        </>
    );
};

export default AVtableRow;
