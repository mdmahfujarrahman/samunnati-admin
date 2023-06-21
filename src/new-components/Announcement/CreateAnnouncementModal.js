import CampaignIcon from '@mui/icons-material/Campaign';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { CreateAnnouncement, GetAllAnnouncement } from '../../redux/api';

const CreateAnnouncementModal = ({show, handleCancel,setAnnouncementInfo}) => {
  const [announcementData, setAnnouncementData] = useState("");
  const [spinn, setSpinn] = useState(false);
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData({ ...announcementData, [name]: value });
  }


  const handlesubmit = async () => {
    try {
            const data = await CreateAnnouncement(announcementData);
            if (data.status === 200) {
              handleCancel()
              const data = await GetAllAnnouncement();
              setAnnouncementInfo(data?.data?.result);

            }
            toast.success(`Announcement added successfully`);
            setSpinn(false);
        } catch (error) {
            setSpinn(false);
    }
  }

  return (
    <>
    <Modal
        show={show}
        onHide={handleCancel}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"><CampaignIcon/> Post New Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addproperty-container">
            {/* <div className="addproperty-personalDetails"> */}
              <div className="addproperty-alignRow">
                  <div className="addproperty-textFieldDiv">
                        <label className="addproperty-inputLabel">
                                Announcement{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                        </label>
                        <input
                                type="text"
                                name="announcementText"
                                placeholder="Company description"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                        />
                  </div>
              </div>
              <div className="addproperty-alignRow">
                    <div className="addproperty-textFieldDiv">
                            <label className="addproperty-inputLabel">
                                Announcement Date{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.2rem" }}
                                >
                                    *
                                </span>{" "}
                            </label>
                            <input
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                name="announcementDate"
                                placeholder="Company description"
                                className="addproperty-inputField"
                                onChange={handleInputchange}
                            />
                        </div>
              </div>
            {/* </div> */}
          </div>
          <div className="addproperty-submitDetailDiv">
                        <button
                            className="addproperty-submitDetailBtn"
                            onClick={handlesubmit}
                        >
                            Post
                            {spinn ? (
                                <div
                                    className="spinner-border spinner-border-sm text-white mx-2"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                        </button>
                    </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CreateAnnouncementModal