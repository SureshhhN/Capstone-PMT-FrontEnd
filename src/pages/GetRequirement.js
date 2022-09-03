import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Navmenu from './Navmenu';
import env from 'react-dotenv'
import Loading from './Loading';

function GetRequirement() {
    let [data,setData] =useState([])
    let [Image,setImage] =useState([])
    let [ReqTitle,setReqTitle] =useState([])
    let [ReqDesc,setReqDesc] =useState([])
    let [CreatedBy,setCreatedBy] =useState([])
    const [isloading, setisloading] = useState(true)

    let Navigate = useNavigate()

     //Fetching the data from mockapi starts
     useEffect(() => {
        getData()
        },[])

//Fetching using Axios
let getData = async()=>{
    try {     
      let modeldata = await axios.get(env.API_URL+'Get-Requirement')
      let modelvalue = modeldata.data.data
      {modelvalue?setisloading(false):setisloading(true)}

    setData(modelvalue)
    } catch (error) {
      alert("Error Occured while fetching the data please contact developer")
      console.log(error)
    }
  }
 // Deleting the data using axios
  
 let handledelete = async(id)=>{
    try {
     let res = await axios.delete(env.API_URL+'Delete_Requirement/'+id)
     getData();
    } catch (error) {
      alert("Error occured while deleting the data please contact developer")
      console.log(error)
    }
  }

  return (
    <div>
        <Navmenu/>
        {isloading ? 
 <Loading/>
:<div>
      <h3>Requirement List</h3>  
        <div className="d-flex justify-content-end">
      <button type="button" className="btn btn-success" onClick={()=>{
              Navigate('/Create-Requirement') 
             }} data-bs-dismiss="modal">Add Requirement</button>
</div>
      <div className='scrolling'>
      <table className="table">
                <thead>
                    <tr>
                    <th scope="col" className='col'>#</th>
                    <th scope="col"className='col-2'>Project Name</th>
                    <th scope="col"className='col-3'>Title</th>
                    <th scope="col" className='col-1'>DeadLine</th>
                    <th scope="col" className='col-1'>Assign To</th>
                    <th scope="col" className='col-2'>Current Status</th>
                    <th scope="col" className='col-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
           data.map((e,i)=>{
             return<>
              <tr>
                     <th scope="row">{i+1}</th>
                     <td>{e.ProjectName}</td>
                     <td>
                     <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal"
                     >
                       {e.ReqTitle}</a></td>
                     <td>{e.DeadLine}</td>
                     <td>{e.AssignTo}</td>
                     <td>{e.Label}</td>
                     <td>
                     <button type="button" class="btn btn-success"onClick={()=>{
               Navigate('/Edit_Requirement/'+e._id) 
              }}>Edit</button> &nbsp;
 
               <button type="button" class="btn btn-danger" onClick={()=>handledelete(e._id)}>Delete</button>   
               
                     </td>
                     </tr>
   
                     
                     </>
           })
         } 
         </tbody>
               
         </table>
      </div>
       

         {/* -- Modal -- */}
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{ReqTitle}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div className='row'>
                <div className='col-12'>
                <h4>Description</h4>
                {ReqDesc} <br/>
                <p className="card-text"><small className="text-muted d-flex justify-content-end">- {CreatedBy}</small></p>

                <hr/><br/>
                
                  </div> 
                  <div className='col-2'>

                  </div>
                </div>  
                
                
                
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                 
                </div>
              </div>
            </div>
          </div> 
</div>}
        </div>
  )
}

export default GetRequirement