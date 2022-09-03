import axios from 'axios';
import {React, useState, useEffect, useContext} from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import Navmenu from './Navmenu';
import { UserContext } from '../UserContext'
import env from 'react-dotenv'

function EditProject() {
  const {user} = useContext(UserContext)

    useEffect(() => {
        
            if(params.id){
              getData();
            }
    }, [])



  let history = useNavigate()
  let params = useParams()
     
  let [ProjectLogo,setProjectLogo]= useState("");
  let [ProjectName,setProjectName]= useState("");
  let [ReqDes,setReqDes]= useState("");
  let [DeadLine,setDeadLine]= useState("");
  let [Author,setAuthor]= useState("");
  let [Requirement,setRequirement]= useState("");
  let [Issues,setIssues]= useState("");
   //Get data of specific id using axios

   let getData = async()=>{
    try {
        let res= await axios.get(env.API_URL+'project/'+params.id)  
        let Editvalues = res.data.data[0]

        setProjectLogo(Editvalues.ProjectLogo)
        setProjectName(Editvalues.ProjectName)
        setReqDes(Editvalues.ReqDes)
        setDeadLine(Editvalues.DeadLine)
        setAuthor(user.data.name)
        setRequirement(Editvalues.Requirement)
        setIssues(Editvalues.Issues)
    } catch (error) {
      alert("Error occured while getting the data please contact developer")
        console.log(error)
    }

  }

 
// Edit and save data using axios
let save=async ()=>{
try {
  let res = await axios.put(env.API_URL+'edit-project/'+params.id,{      
    ProjectLogo,
    ProjectName, 
    ReqDes,
    DeadLine,
    Author,
    Requirement,
    Issues        
    })
    history('/Project-List')
} catch (error) {
  alert("Error occured while updating the data please contact the developer")
      console.log(error)
}

}


  return <div className='container-fluid'>
    <Navmenu/>
      <div className="row g-3">
      <h4>Edit Model</h4>
  <div className="col-md-6">
    <label htmlFor="Image_1" className="form-label">ProjectLogo</label>
    <input type="text" value={ProjectLogo} className="form-control" id="Image_1" onChange={(e)=>setProjectLogo(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="Image_2" className="form-label">ProjectName</label>
    <input type="text" value={ProjectName} className="form-control" id="Image_2"onChange={(e)=>setProjectName(e.target.value)}/>
  </div>
  <div className="col-md-12">
    <label htmlFor="Image_3" className="form-label">Description</label>
    <textarea type="text" value={ReqDes} className="form-control" id="Image_3" onChange={(e)=>setReqDes(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="Name" className="form-label">Dead Line</label>
    <input type="date" value={DeadLine} className="form-control" id="Name" onChange={(e)=>setDeadLine(e.target.value)}/>
  </div>
  
  <div className="col-12 d-grid gap-2">
    <button className="btn btn-primary" onClick={save}>Add Model</button>
  </div>
</div>

  </div>;
}

export default EditProject;