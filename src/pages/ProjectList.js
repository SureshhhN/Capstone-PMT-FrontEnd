import Navmenu from './Navmenu'
import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import Loading from './Loading';

function ProjectList() {
    let [data,setData] =useState([])
    let [desc,setDesc] =useState('')
    let [Auth,setAuth] =useState('')
    const [isloading, setisloading] = useState(true)

    let Navigate = useNavigate()
 
    // const {user,setUser} = useContext(UserContext)
    
    //Fetching the data from mockapi starts
    useEffect(() => {
      getData()
      },[])
    
    
    //Fetching using Axios
    let getData = async()=>{
      try {     
        let modeldata = await axios.get(env.API_URL)
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
       let res = await axios.delete(env.API_URL+'delete/'+id)
        
        getData();
      } catch (error) {
        alert("Error occured while deleting the data please contact developer")
        console.log(error)
      }
    }
  return (<>
  
    <div>
 <Navmenu/>
 {isloading ? 
 <Loading/>
:<div>
        <h3>PROJECT LIST</h3>
        <div className="d-flex justify-content-end">
      
          <button type="button" className="btn btn-success" onClick={()=>{
              Navigate('/Create-Project') 
             }}>Add Project</button>
            &nbsp; &nbsp;
            <button type="button" className="btn btn-success" onClick={()=>{
              Navigate('/Project-Chart') 
             }}>Chart</button>
        </div>
        <br/>
  
    <div className='container-fluid'>
      <div className='row'>
         {
           data.map((e,i)=>{

             return<div key={i}className='col'>
                <div>

                <div className="card-group" style={{ width: '19rem' }}>
                    <div className="card">
                        <img src={e.ProjectLogo}  className="card-img-top" alt="..." style={{ height: '19rem' }}/>
                        <div className="card-body">
                        <h5 className="card-title">{i+1}. {e.ProjectName}</h5>
                          
                        <p className="card-text" style={{ color: 'red' }}>Dead Line: {e.DeadLine}</p>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setDesc(e.ReqDes)
                           setAuth(e.Author)}}>Description</button>
              &nbsp;&nbsp;
              

              <button type="button" className="btn btn-success"onClick={()=>{
              Navigate('/EditProject/'+e._id) 
             }}>Edit</button> &nbsp;
              <button type="button" className="btn btn-danger" onClick={()=>handledelete(e._id)}>Delete</button>
                        </div>
                    </div>
    
                </div>
                {/* <!-- Button trigger modal --> */}


{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {desc}
      <p className="card-text"><small className="text-muted d-flex justify-content-end">- {Auth}</small></p>
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-success"onClick={()=>{
              Navigate('/Create-Requirement') 
             }} data-bs-dismiss="modal">Add Requirement</button> &nbsp;
              <button type="button" className="btn btn-danger" onClick={()=>{
              Navigate('/Create-Issues') 
             }} data-bs-dismiss="modal">Add Issue</button>

        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                </div>
            </div>
    
           })
         } 
        </div>
        
    </div> 
    </div>}
     </div>
     </>
   )
}

export default ProjectList