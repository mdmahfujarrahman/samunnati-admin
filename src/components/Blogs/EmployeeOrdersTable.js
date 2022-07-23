import React from 'react';
import { blockAndUnBlockArtist } from '../../redux/api';
import '../../styles/ArtistsTable.css';

const EmployeeOrdersTable = (props) => {
  const { linkedArtists, paymentList, setBoolVal } = props;
  // console.log(linkedArtists);

  const totalOrders = (id) => {
    const temp = paymentList.filter((order) => order.artist._id === id);
    if (temp.length > 0) {
      return temp[0].paymentsOfArtist.length;
    }
    return 0;
  };

  const pendingOrders = (id) => {
    const temp = paymentList.filter((order) => order.artist._id === id);
    if (temp.length > 0) {
      const tempArray = temp[0]?.paymentsOfArtist;
      const pendings = tempArray.filter((p) => p.status === 'pending');
      return pendings.length;
    }
    return 0;
  };

  const handleBlockArtist = async (id) => {
    try {
      await blockAndUnBlockArtist(id);
      setBoolVal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Location</th>
            <th>Total Income</th>
            <th>Total Orders</th>
            <th>Pending Orders</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {linkedArtists?.map((artist) => {
            return (
              <tr key={artist._id}>
                <td>{artist.username}</td>
                <td>{artist.address}</td>
                <td>{`Rs ${parseInt(artist.balance).toFixed(2)}/-`}</td>
                <td>{totalOrders(artist._id)}</td>
                <td>{pendingOrders(artist._id)}</td>
                <td>
                  <button
                    className='artist-blockBtn'
                    onClick={() => handleBlockArtist(artist._id)}
                  >
                    {artist.blocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeOrdersTable;
