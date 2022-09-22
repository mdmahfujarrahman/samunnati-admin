import React from 'react'
import '../../styles/newstyles/dashboard.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import {faker} from '@faker-js/faker';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
    


function Dashboard() {
  return (
    <>
        <section className='d-flex flex-column align-items-center'>
            <div className="d-flex p-4 justify-content-between align-items-center">
                    <div className='box'>
                        <h5>Total User</h5>
                        <p>2020</p>
                    </div>
                    <div className='box'>
                        <h5>
                            Total Views
                        </h5>
                        <p>2020</p>

                    </div>
                    <div className='box'>
                        <h5>Most Viewed Videos</h5>
                        <p>2020</p>

                    </div>
                    <div className='box'>
                        <h5>Most Viewed Playlist</h5>
                        <p>2020</p>

                    </div>
            </div>

            <div className='col-8 d-flex jy-content-center '>
            <Bar options={options} data={data} />
            </div>
        </section>
    </>
  )
}

export default Dashboard