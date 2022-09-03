import axios from 'axios';
import {React, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import *as yup from 'yup'
import { UserContext } from '../UserContext'
import Navmenu from './Navmenu';
import env from 'react-dotenv'

function CreateIssue() {
    const {user} = useContext(UserContext)
    let [label,setlabel] =useState([])
    let [Projectdata,setProjectdata] =useState([])
    let [Userdata,setUserdata] =useState([])
    
  let history = useNavigate()

  useEffect(() => {
    getLableData()
    getData()
    getUserData()
    
    },[])
  
   

  const formik = useFormik({
    initialValues:{  
          
      IssueTitle:'',
      IssueDes:'',
      DeadLine:'',
      AssignTo:'',
      Priority:'',
      CreatedBy:user.data.name,
      Label:'',
      ProjectName: '',
      IssueScreen:''

    },
    validationSchema: yup.object({
    IssueTitle:yup.string().required('Title is required'),
    IssueDes:yup.string().required('Description this required'),
    DeadLine:yup.string().required('Dead Line is required'),
    AssignTo:yup.string().required('Assignee Name is required'),
    Priority:yup.string().required('Select Priority'),
    Label:yup.string().required('Select Label'),
    ProjectName:yup.string().required('Select Project Name'),
    }),
    onSubmit:values=>{
      
      save(values, null, 2)
    }
  })
  
//Adding data using axios
  let save = async(data)=>{
    try {
      let res =  await axios.post(env.API_URL+'addIssues',data)
    history('/Project-list')
      
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    }
    
  }

  let getLableData = async()=>{
    try {
    
      let label= await axios.get(env.API_URL+'Label')
      let labelvalue = label.data.data
    setlabel(labelvalue)
    } catch (error) {
      alert("Error Occured while fetching the data please contact developer")
      console.log(error)
    }
    

  }

  let getData = async()=>{
    try {     
      let projectdata = await axios.get(env.API_URL)
      let projectvalue = projectdata.data.data
      setProjectdata(projectvalue)
    } catch (error) {
      alert("Error Occured while fetching the data please contact developer")
      console.log(error)
    }
  }

  let getUserData = async()=>{
    try {     
      let Userdata = await axios.get(env.API_URL+'user')
      let Uservalue = Userdata.data.data
      setUserdata(Uservalue)
    } catch (error) {
      alert("Error Occured while fetching the data please contact developer")
      console.log(error)
    }
  }

  return (
    <div >
      <Navmenu/>
      <h3 style={{ background:" #ffface"}}>CREATE ISSUES</h3>
      
      <div className='container-fluid' style={{background: "bisque"}}>
        <form className='row' onSubmit={formik.handleSubmit}>
        <div className='col-9' style={{ background:" #ffface"}}>
           <div className="col-md-12 formfields">
                <label htmlFor="IssueTitle">Issue title</label>
                <input id="IssueTitle" name="IssueTitle" type="text"
                  className="form-control" placeholder='Enter Issue Title'
                  onChange={formik.handleChange}
                  value={formik.values.IssueTitle}/>
                  {formik.touched.IssueTitle && formik.errors.IssueTitle?(<div style={{color:"red"}}>{formik.errors.IssueTitle}</div>
                  ):null}
            </div>
            <div className="col-md-12 formfields">
                <label htmlFor="IssueScreen">Issue Screenshot</label>
                <input id="IssueScreen" name="IssueScreen" type="text"
                  className="form-control" placeholder='Enter Issue screenshot URL'
                  onChange={formik.handleChange}
                  value={formik.values.IssueScreen}/>
                  {formik.touched.IssueScreen && formik.errors.IssueScreen?(<div style={{color:"red"}}>{formik.errors.IssueScreen}</div>
                  ):null}
            </div>

            <div className="col-md-12 formfields" style={{height:"330px"}}>
               
               <label htmlFor="IssueDes">Description</label>
                 <textarea id="IssueDes" name="IssueDes" type="text"
                   className="form-control" placeholder='Enter Description'
                   onChange={formik.handleChange}
                   value={formik.values.IssueDes} style={{height:"300px"}}/>
                   {formik.touched.IssueDes && formik.errors.IssueDes?(<div style={{color:"red"}}>{formik.errors.IssueDes}</div>
                   ):null}
            </div>
            
             
        </div> 
        
        <div className='col'>

        <div className="col formfields">
    <label htmlFor="ProjectName" className="form-label" style={{ display: 'block' }}>
    ProjectName
      </label>
      <select
        name="ProjectName"
        id="ProjectName"
        className="form-control" placeholder='Select ProjectName'
        value={formik.values.ProjectName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{ display: 'block' }}
      ><option value="" label="Select option" />
          { Projectdata.map((e,i)=>{
             return<>
             <option value= {e.ProjectName} label={e.ProjectName} />
             </>})}   
      </select>
       {formik.touched.ProjectName && formik.errors.ProjectName?(<div style={{color:"red"}}>{formik.errors.ProjectName}</div>):null}
  
          </div>


                                 
          <div className="col formfields">
          <label htmlFor="Label" className="form-label" style={{ display: 'block' }}>
          Label
            </label>
            <select
              name="Label"
              id="Label"
              className="form-control" placeholder='Select Label'
              value={formik.values.Label}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ display: 'block' }}
            ><option value="" label="Select option" />
                { label.map((e,i)=>{
                  return<>
                  <option value= {e.LabelName} label={e.LabelName} />
                  </>})}   
            </select>
            {formik.touched.Label && formik.errors.Label?(<div style={{color:"red"}}>{formik.errors.Label}</div>):null}
        
          </div>
 
            <div className="col formfields">
               
               <label htmlFor="DeadLine">Dead Line</label>
                 <input id="DeadLine" name="DeadLine" type="Date"
                   className="form-control" placeholder='Select DeadLine'
                   onChange={formik.handleChange}
                   value={formik.values.DeadLine}/>
                   {formik.touched.DeadLine && formik.errors.DeadLine?(<div style={{color:"red"}}>{formik.errors.DeadLine}</div>
                   ):null}
 
 
          </div>

          <div className="col formfields">
                      <label htmlFor="AssignTo">AssignTo</label>
                      <select
                            name="AssignTo"
                            id="AssignTo"
                            className="form-control" placeholder='Select AssignTo'
                            value={formik.values.AssignTo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ display: 'block' }}
                          >
                            <option value="" label="Select option" />
                              { Userdata.map((e,i)=>{
                                return<>
                                <option value= {e.name} label={e.name} />
                                </>})}   
                          </select>
                            {formik.touched.AssignTo && formik.errors.AssignTo?(<div style={{color:"red"}}>{formik.errors.AssignTo}</div>
                            ):null}
          </div>
          
          <div className="col formfields">
              <label htmlFor="Priority" className="form-label" style={{ display: 'block' }}>
              Bug Type
                </label>
                <select
                  name="Priority"
                  id="Priority"
                  className="form-control" placeholder='Select Priority'
                  value={formik.values.Priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ display: 'block' }}
                >
                  <option value="" label="Select option" />
                  <option value='Emergency' label='Emergency' />
                  <option value='High' label='High' />
                  <option value='Normal' label='Normal' />
                  <option value='Low' label='Low' />     
                </select>
                {formik.touched.Priority && formik.errors.Priority?(<div style={{color:"red"}}>{formik.errors.Priority}</div>):null}
            
          </div>
            
        </div>

 <div class="modal-footer">
        
        <button type="submit" class="btn btn-primary" >Save changes</button>
        <button type="button" className="btn btn-secondary" onClick={()=>{
              history('/Issues') 
             }} data-bs-dismiss="modal">Cancel</button>
      </div>
                  

              </form>
      </div>
      </div>

  )
}

export default CreateIssue