import React from 'react';
import '../../../styles/ArtistsTable.css';
import Singleblog from './Singleblog';

const EmployeesTable = (prop) => {
  
  return (
    <div className='table-wrapper' id='#scrollBar'>
              
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Author</th>
            <th>Date</th>
            <th>Minutes</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          prop?.blogData?.map((blog,ind)=>{
               return <Singleblog
                  key={ind}
                  id={blog._id}
                  body={blog.body}
                  writerName={blog.writerName}
                  title={blog.title}
                  tag={blog.tag}
                  date={blog.date}
                  links={blog.links}
                  minutes={blog.minutes}
               />

          })
        }
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
