import axios from 'axios';
import {React, useState, useEffect, useContext} from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import Navmenu from './Navmenu';
import { UserContext } from '../UserContext'
import env from 'react-dotenv'

function EditLabel() {
    const {user} = useContext(UserContext)

    useEffect(() => {
        
            if(params.id){
              getData();
            }
    }, [])



  let history = useNavigate()
  let params = useParams()
     
  let [LabelName,setLabelName]= useState("");
  let [LabelType,setLabelType]= useState("");
  let [LabelDesc,setLabelDesc]= useState("");
  let [LabelColor,setLabelColor]= useState("");
  let [CreatedBy]= useState(user.data.name);
   //Get data of specific id using axios

   let getData = async()=>{
    try {
        let res= await axios.get(env.API_URL+'Label/'+params.id)  
        let Editvalues = res.data.data[0]

        setLabelName(Editvalues.LabelName)
        setLabelType(Editvalues.LabelType)
        setLabelDesc(Editvalues.LabelDesc)
        setLabelColor(Editvalues.LabelColor)
 
    } catch (error) {
      alert("Error occured while getting the data please contact developer")
        console.log(error)
    }

  }

 
// Edit and save data using axios
let save=async ()=>{
try {
  let res = await axios.put(env.API_URL+'edit-Label/'+params.id,{      
    LabelName,
    LabelType, 
    LabelDesc,
    LabelColor,
    CreatedBy       
    })
    history('/Label')
} catch (error) {
  alert("Error occured while updating please contact the developer")
      console.log(error)
}

}


  return <div className='container-fluid'>
    <Navmenu/>
      <div className="row g-3">
      <h4>Edit Label</h4>
  <div className="col-md-6">
    <label htmlFor="Image_1" className="form-label">LabelName</label>
    <input type="text" value={LabelName} className="form-control" id="Image_1" onChange={(e)=>setLabelName(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="Image_2" className="form-label">LabelType</label>
    <input type="text" value={LabelType} className="form-control" id="Image_2"onChange={(e)=>setLabelType(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="Image_3" className="form-label">Description</label>
    <input type="text" value={LabelDesc} className="form-control" id="Image_3" onChange={(e)=>setLabelDesc(e.target.value)}/>
  </div>
  
  <div className="col-md-6">
    <label htmlFor="Width" className="form-label">LabelColor</label>
    <input type="color" value={LabelColor} className="form-control" id="Width" onChange={(e)=>setLabelColor(e.target.value)}/>
  </div>
  
  
  <div className="col-12 d-grid gap-2">
    <button className="btn btn-primary" onClick={save}>Add Model</button>
  </div>
</div>

  </div>;
}

export default EditLabel;