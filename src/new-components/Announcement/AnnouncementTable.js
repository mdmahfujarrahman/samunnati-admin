import React from "react";
import "../../styles/newstyles/table.css";
import AnnouncementTableRow from "./AnnouncementTableRow";

const AnnouncementTable = ({ announcementData, setAnnouncementData, filterData, setFilterData }) => {
    return (
        <div className="table-wrapper" id="#scrollBar">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Announcement</th>
                        <th>Announcement Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData
                        ? filterData &&
                          filterData?.map((item, index) => {
                              return (
                                  <AnnouncementTableRow
                                      key={index}
                                      announcementData={announcementData}
                                      filterData={filterData}
                                      index={index}
                                      announcementId={item._id}
                                      announcementText={item.announcementText}
                                        announcementDate={item.announcementDate}
                                      template={item.template}
                                      setFilterData={setFilterData}
                                      setAnnouncementData={setAnnouncementData}
                                  />
                              );
                          })
                        : announcementData &&
                          announcementData?.map((item, index) => {
                              return (
                                  <AnnouncementTableRow
                                      key={index}
                                      announcementData={announcementData}
                                      announcementText={item.announcementText}
                                        announcementDate={item.announcementDate}
                                      setAnnouncementData={setAnnouncementData}
                                      index={index}
                                      announcementId={item._id}
                                  />
                              );
                          })}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementTable;
