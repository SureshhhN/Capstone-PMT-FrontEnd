import axios from 'axios';
import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import *as yup from 'yup'
import { UserContext } from '../UserContext'
import Navmenu from './Navmenu';
import env from 'react-dotenv'

function CreateProject() {
  const {user} = useContext(UserContext)

  let history = useNavigate()

  const formik = useFormik({
    initialValues:{         
      ProjectLogo:'',
      ProjectName:'', 
      ReqDes:'',
      DeadLine:'',
      Author:user.data.name,
      Issues:[],
      Requirement:[],
    },
    validationSchema: yup.object({
    ProjectLogo:yup.string().required('Image link is required'),
    ProjectName:yup.string().required('Project Name is required'), 
    ReqDes:yup.string().required('Description this required'),
    DeadLine:yup.string().required('Dead Line is required'),
    
    
    }),
    onSubmit:values=>{
      save(values, null, 2)
    }
  })
  
//Adding data using axios
  let save = async(data)=>{
    try {
      let res =  await axios.post(env.API_URL+'addproject',data)
        history('/Project-list')
      
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    }
    
  }



  return <div>
 <Navmenu/>
    <div className='container'>  
              <form className='row g-3' onSubmit={formik.handleSubmit}>
              <h3>CREATE NEW PROJECT</h3> 
          <div className="col-md-6">
                <label htmlFor="ProjectLogo">ProjectLogo</label>
                <input id="ProjectLogo" name="ProjectLogo" type="text"
                  className="form-control" placeholder='Enter Image URL'
                  onChange={formik.handleChange}
                  value={formik.values.ProjectLogo}/>
                  {formik.touched.ProjectLogo && formik.errors.ProjectLogo?(<div style={{color:"red"}}>{formik.errors.ProjectLogo}</div>
                  ):null}
            </div>
            
            <div className="col-md-6">     

              <label htmlFor="ProjectName">Project Name</label>
                <input id="ProjectName" name="ProjectName" type="text"
                  className="form-control" placeholder='Enter Project Name'
                  onChange={formik.handleChange}
                  value={formik.values.ProjectName}/>
                  {formik.touched.ProjectName && formik.errors.ProjectName?(<div style={{color:"red"}}>{formik.errors.ProjectName}</div>
                  ):null}
             </div>

             <div className="col-md-12">
               
              <label htmlFor="ReqDes">Description</label>
                <textarea id="ReqDes" name="ReqDes" type="text"
                  className="form-control" placeholder='Enter Description'
                  onChange={formik.handleChange}
                  value={formik.values.ReqDes}/>
                  {formik.touched.ReqDes && formik.errors.ReqDes?(<div style={{color:"red"}}>{formik.errors.ReqDes}</div>
                  ):null}


</div>
            <div className="col-md-6">
               
              <label htmlFor="DeadLine">Dead Line</label>
                <input id="DeadLine" name="DeadLine" type="Date"
                  className="form-control" placeholder='Enter DeadLine'
                  onChange={formik.handleChange}
                  value={formik.values.DeadLine}/>
                  {formik.touched.DeadLine && formik.errors.DeadLine?(<div style={{color:"red"}}>{formik.errors.DeadLine}</div>
                  ):null}


</div>
<div>
                  <button type='submit' className='btn btn-primary'>
                  Add Project
                  </button>
&nbsp;&nbsp;
                  <button className='btn btn-secondary' onClick={()=>{history('/Project-list')}}>Cancel</button>
                  </div>
              </form>

   
  </div>
  </div>
  // </div>
}

export default CreateProject;