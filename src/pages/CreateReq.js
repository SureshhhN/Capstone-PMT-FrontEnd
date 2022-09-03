import axios from 'axios';
import {React, useContext, useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import *as yup from 'yup'
import { UserContext } from '../UserContext'
import Navmenu from './Navmenu';
import env from 'react-dotenv'

function CreateReq() {
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
          ReqTitle:'',
          ReqDes:'',
          DeadLine:'',
          AssignTo:'',
          Priority:'',
          CreatedBy:user.data.name,
          Label:'',
          ProjectName: '',
        },
        validationSchema: yup.object({
        ReqTitle:yup.string().required('Title is required'),
        ReqDes:yup.string().required('Description this required'),
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

      let save = async(data)=>{
        try {
          let res =  await axios.post(env.API_URL+'Add-Requirement',data)
        history('/Requirement')
          
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
    <div>

        <Navmenu/>
        <h3 style={{ background:" #ffface"}}>
          CREATE REQUIREMENT</h3>
        <div className='container-fluid' style={{background: "bisque"}}>
        <form className='row' onSubmit={formik.handleSubmit}>
        <div className='col-9' style={{ background:" #ffface"}}>
          <div className="col-md-12 formfields">
                <label htmlFor="ReqTitle">Requirement title</label>
                <input id="ReqTitle" name="ReqTitle" type="text"
                  className="form-control" placeholder='Enter Requirement Title'
                  onChange={formik.handleChange}
                  value={formik.values.ReqTitle}
                  
                  />
                  {formik.touched.ReqTitle && formik.errors.ReqTitle?(<div style={{color:"red"}}>{formik.errors.ReqTitle}</div>
                  ):null}
            </div>
            <div className="col-md-12 formfields">
                <label htmlFor="IssueScreen">Mock Up Screenshot</label>
                <input id="IssueScreen" name="IssueScreen" type="text"
                  className="form-control" placeholder='Enter Issue screenshot URL'
                  onChange={formik.handleChange}
                  value={formik.values.IssueScreen}/>
                  {formik.touched.IssueScreen && formik.errors.IssueScreen?(<div style={{color:"red"}}>{formik.errors.IssueScreen}</div>
                  ):null}
            </div>
            <div className="col-md-12 formfields" style={{height:"330px"}}>
               
              <label htmlFor="ReqDes">Description</label>
                <textarea id="ReqDes" name="ReqDes" type="text"
                  className="form-control" placeholder='Enter Description'
                  onChange={formik.handleChange}
                  value={formik.values.ReqDes}
                  style={{height:"300px"}}
                  />
                  {formik.touched.ReqDes && formik.errors.ReqDes?(<div style={{color:"red"}}>{formik.errors.ReqDes}</div>
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
               
              <label htmlFor="DeadLine">Dead Line</label>
                <input id="DeadLine" name="DeadLine" type="Date"
                  className="form-control" placeholder='Select DeadLine'
                  onChange={formik.handleChange}
                  value={formik.values.DeadLine}/>
                  {formik.touched.DeadLine && formik.errors.DeadLine?(<div style={{color:"red"}}>{formik.errors.DeadLine}</div>
                  ):null}


            </div>

            <div className="col formfields">
                <label htmlFor="Label" className="form-label" style={{ display: 'block' }}>
                AssignTo
                  </label>
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
                  {formik.touched.AssignTo && formik.errors.AssignTo?(<div style={{color:"red"}}>{formik.errors.AssignTo}</div>):null}
              
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

              
              </div>


 <div class="modal-footer">
        
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
                  

              </form>
      </div>
    </div>
  )
}

export default CreateReq