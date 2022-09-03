import axios from 'axios';
import {React, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import { UserContext } from '../UserContext'
import *as yup from 'yup'
import env from 'react-dotenv'

function CreateLabel() {
    const {user} = useContext(UserContext)

  let history = useNavigate()

  const formik = useFormik({
    initialValues:{         
      LabelName:'',
      LabelType:'', 
      LabelDesc:'',
      LabelColor:'',
      CreatedBy:user.data.name,
     
    },
    validationSchema: yup.object({
    LabelName:yup.string().required('Title is required'),
    LabelDesc:yup.string().required('Description this required'),
    LabelColor:yup.string().required('Select Label Color'),
    LabelType:yup.string().required('Select Label Type'),

    }),
    onSubmit:values=>{
      save(values, null, 2)
    }
  })
  
//Adding data using axios
  let save = async(data)=>{
    
    try {
      let res =  await axios.post(env.API_URL+'addLabel',data)
        
      
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    }
    
  }

  return (
    <div >
        
        <form className='row g-3' onSubmit={formik.handleSubmit}>
            
          <div className="col-md-6">
                <label htmlFor="LabelName">Label Name</label>
                <input id="LabelName" name="LabelName" type="text"
                  className="form-control" placeholder='Enter Issue Title'
                  onChange={formik.handleChange}
                  value={formik.values.LabelName}/>
                  {formik.touched.LabelName && formik.errors.LabelName?(<div style={{color:"red"}}>{formik.errors.LabelName}</div>
                  ):null}
            </div>
            <div className="col-md-5">
                <label htmlFor="LabelType" className="form-label" style={{ display: 'block' }}>
                Label Type
                </label>
                <select
                    name="LabelType"
                    id="LabelType"
                    className="form-control" placeholder='Select Label Type'
                    value={formik.values.LabelType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ display: 'block' }}
                >
                    <option value="" label="Select option" />
                    <option value='Priority Labels' label='Priority Labels' />
                    <option value='Project Labels' label='Project Labels' />
                    <option value='Other Labels' label='Others' />
                
                </select>

                {formik.touched.LabelType && formik.errors.LabelType?(<div style={{color:"red"}}>{formik.errors.LabelType}</div>):null}
            
            </div> 
            <div className="col-md-1">
            <label htmlFor="LabelColor">LabelColor</label>
                <input id="LabelColor" name="LabelColor" type="color"
                  className="form-control" placeholder='Select Color'
                  onChange={formik.handleChange}
                  value={formik.values.LabelColor}/>
                  {formik.touched.LabelColor && formik.errors.LabelColor?(<div style={{color:"red"}}>{formik.errors.LabelColor}</div>
                  ):null}
 </div>
 

             <div className="col-md-12">
               
              <label htmlFor="LabelDesc">Description</label>
                <textarea id="LabelDesc" name="LabelDesc" type="text"
                  className="form-control" placeholder='Enter Description'
                  onChange={formik.handleChange}
                  value={formik.values.LabelDesc}/>
                  {formik.touched.LabelDesc && formik.errors.LabelDesc?(<div style={{color:"red"}}>{formik.errors.LabelDesc}</div>
                  ):null}


</div>

 <div class="modal-footer">
        
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
                  

              </form>
      </div>
      

  )
}

export default CreateLabel