import React from "react";
import "../../../styles/newstyles/table.css";
import UtableRow from "./UtableRow";

const Utable = ({ UserData, setUserData, filterData, setFilterData }) => {
    return (
        <div className="table-wrapper" id="#scrollBar">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Father Name</th>
                        <th>Occupation</th>
                        <th>Village</th>
                        <th>Gotra</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Residence Number</th>
                        <th>Address</th>
                        <th>Marital Status</th>
                        <th>Wife Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData
                        ? filterData &&
                          filterData?.map((item, index) => {
                              return (
                                  <UtableRow
                                      key={index}
                                      UserData={UserData}
                                      filterData={filterData}
                                      fatherName={item.fatherName}
                                      userId={item?.id}
                                      index={index}
                                      occupation={item.occupation}
                                      email={item.email}
                                      name={item.name}
                                      phoneNumber={item.phoneNumber}
                                      age={item.age}
                                      village={item.village}
                                      gotra={item.gotra}
                                      residenceNumber={item.residenceNumber}
                                      address={item.address}
                                      imgUrl={item.imgUrl}
                                      maritalStatus={item.maritalStatus}
                                      wifeName={item.wifeName}
                                      setFilterData={setFilterData}
                                      setUserData={setUserData}
                                  />
                              );
                          })
                        : UserData &&
                          UserData?.map((item, index) => {
                              return (
                                  <UtableRow
                                      key={index}
                                      UserData={UserData}
                                      fatherName={item.userInfoEng?.fatherName}
                                      userId={item?._id}
                                      index={index}
                                      occupation={item.userInfoEng?.occupation}
                                      email={item.userInfoEng?.email}
                                      name={item.userInfoEng?.name}
                                      phoneNumber={
                                          item.userInfoEng?.phoneNumber
                                      }
                                      age={item.userInfoEng?.age}
                                      village={item.userInfoEng?.village}
                                      gotra={item.userInfoEng?.gotra}
                                      residenceNumber={
                                          item.userInfoEng?.residenceNumber
                                      }
                                      maritalStatus={
                                          item.userInfoEng?.maritalStatus
                                      }
                                      wifeName={item.userInfoEng?.wifeName}
                                      address={item.userInfoEng?.address}
                                      imgUrl={item.userInfoEng?.imgUrl}
                                      setUserData={setUserData}
                                  />
                              );
                          })}
                </tbody>
            </table>
        </div>
    );
};

export default Utable;
