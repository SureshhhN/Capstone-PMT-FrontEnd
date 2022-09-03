import {React,useState, useEffect} from 'react'
import Navmenu from './Navmenu'
import {useNavigate} from 'react-router-dom'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import axios from 'axios';
import env from 'react-dotenv'
import Loading from './Loading';

function ProjectChart() {
    let history = useNavigate()
    
    let [ProjectName,setProjectName] =useState([])
    let [ProjectIssues,setProjectIssues] =useState([])
    let [ProjectReq,setProjectReq] =useState([])
    const [isloading, setisloading] = useState(true)

  
    //Fetching the data from mockapi starts
    useEffect(() => {
      getData()
        },[])
      

      // Fetching using Axios
      let getData = async()=>{
        let Projectdata = []
        
        try {     
          let modeldata = await axios.get(env.API_URL)
          let modelvalue = modeldata.data.data
          {modelvalue?setisloading(false):setisloading(true)}

          let GetReq = await axios.get(env.API_URL+'Get-Requirement')
          let Reqvalue = GetReq.data.data

          let GetIssues = await axios.get(env.API_URL+'Issues')
          let Issuevalue = GetIssues.data.data 

          setProjectName([])
          setProjectIssues([])
          setProjectReq([])
        modelvalue.map((e,i)=>{         
          setProjectName(oldArray => [...oldArray, e.ProjectName])
          Projectdata.push({Name: e.ProjectName})
          

              function filterIssues(Issue) {
                  return Issue.ProjectName == Projectdata[i].Name;
              }          
              function Issuefunc() {
               var filtered = Issuevalue.filter(filterIssues);
                setProjectIssues(oldArray => [...oldArray, filtered.length]) 
              }
              Issuefunc();


            function filterReq(Req) {
                return Req.ProjectName == Projectdata[i].Name;
            }          
            function Requirement() {
             var filtered = Reqvalue.filter(filterReq);
             setProjectReq(oldArray => [...oldArray, filtered.length]) 
            }
            Requirement();

       })
       

        } catch (error) {
          alert("Error Occured while fetching the data please contact developer")
          console.log(error)
        }
      }

  
    
ChartJS.register(...registerables);

const state = {

    labels: ProjectName,
    datasets: [
      {
        label: 'Issues',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'red',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: ProjectIssues
      },
      {
        label: 'Requirement',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'green',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: ProjectReq
      }
    ]
  }


  return (
    <div>
        <Navmenu/>
        {isloading ? 
 <Loading/>
: <div> 
<h3>PROJECT CHART</h3>        
        <div className="d-flex justify-content-end">
        <button className='btn btn-secondary' onClick={()=>{history('/Project-list')}}>Cancel</button>

        </div>
  
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Project',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          className="barchar"
        />
</div>
}
        
      </div>
  )
}

export default ProjectChart