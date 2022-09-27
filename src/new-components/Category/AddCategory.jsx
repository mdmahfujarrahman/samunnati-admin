import React,{useState} from 'react'

function AddCategory() {
  const [spinn, setspinn] = useState(false);

    const handleInputchange=()=>{

    }
    const handlesubmit = async(e)=>{
        e.preventDefault()
        const formdata = new FormData();
        // formdata.append('file', videoData.video);
        try {
    
        //   const data =await axios.post("https://aws-file-upload-v1.herokuapp.com/api/v2/samunnati/upload/file",formdata)
        //   console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    return (
        <>
            <form>
                <div className="addproperty-container">
                    <div className="addproperty-personalDetails">
                        {/* 1st row */}
                        <div className="addproperty-alignRow">
                            <div className=" form-group">
                                <label className="addproperty-inputLabel ">
                                    Category Name{' '}
                                    <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
                                </label>
                                <input
                                    type="text"
                                    name="Category"
                                    placeholder="Category"
                                    className="addproperty-inputField w-100"
                                    onChange={handleInputchange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="addproperty-submitDetailDiv">
            <button
              className="addproperty-submitDetailBtn"
              onClick={handlesubmit}
            >
              Add Category
              {spinn ? (
                <div
                  class="spinner-border spinner-border-sm text-white mx-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                ''
              )}
            </button>
          </div>
                    </div></form>
        </>
    )
}

export default AddCategory