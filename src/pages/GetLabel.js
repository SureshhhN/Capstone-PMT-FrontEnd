import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import Loading from './Loading';

function GetLabel() {
    let [data,setData] =useState([])
    let Navigate = useNavigate()
    const [isloading, setisloading] = useState(true)

    //Fetching the data from mockapi starts
    useEffect(() => {
      getData()
      },[])
    
    
    //Fetching using Axios
    let getData = async()=>{
      try {
      
        let modeldata = await axios.get(env.API_URL+'Label')
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
       let res = await axios.delete(env.API_URL+'delete-Label/'+id)
        
        getData();
      } catch (error) {
        alert("Error occured while deleting the data please contact developer")
        console.log(error)
      }
    }
  return (
  <div>
    {isloading ? 
 <Loading/>
:<div>
    <div class="table-responsive-md">
   
      <table class="table" >
                <thead >
                    <tr >
                    <th scope="col" className='col'>#</th>
                    <th scope="col"className='col-1'>Label</th>
                    <th scope="col" className='col-7'>Description</th>
                    <th scope="col" className='col-2'>Type</th>
                    <th scope="col" className='col-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
         {
           data.map((e,i)=>{
             return<>
                
                
                <tr>
                    <th scope="row">{i+1}</th>
                    <td>
                      <button style={{
                        backgroundColor:e.LabelColor,width:'200px',
                        }} id="labelbtn">{e.LabelName}
                      </button></td>
                    <td>{e.LabelDesc}</td>
                    <td>{e.LabelType}</td>
                    <td>
                    <button type="button" class="btn btn-success"onClick={()=>{
              Navigate('/EditLabel/'+e._id) 
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
   </div>}     
    </div> 
     
     
   )
}

export default GetLabel