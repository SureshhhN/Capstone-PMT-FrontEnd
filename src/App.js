import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import About from './pages/About';
import {UserContext} from './UserContext'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateProject from './pages/CreateProject';
import ProjectList from './pages/ProjectList';
import EditProject from './pages/EditProject';
import EditIssues from './pages/EditIssues';
import Labels from './pages/Labels';
import EditLabel from './pages/EditLabel';
import ProjectChart from './pages/ProjectChart';
import CreateReq from './pages/CreateReq';
import CreateIssue from './pages/CreateIssue';
import GetIssueList from './pages/GetIssueList';
import GetRequirement from './pages/GetRequirement';
import EditReq from './pages/EditReq';
import env from 'react-dotenv'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user,setUser] = useState()
  const [project,setProject] = useState()
  console.log(env.API_URL)
  return (
   <>
      <Router>
          <div>  
                     
              <UserContext.Provider value={{user,setUser}}>
              <UserContext.Provider value={{project,setProject}}></UserContext.Provider>
              <Routes>

                
              <Route path='/' element={<SignIn/>}/>
            
              <Route path='/about/'element={<About/>} />
              <Route path='/Sign-up/'element={<SignUp/>} />
              <Route path='/Create-Project/'element={<CreateProject/>} />
              <Route path='/Project-list/'element={<ProjectList/>} />
              <Route path='/EditProject/:id'element={<EditProject/>} />
              <Route path='/Label'element={<Labels/>} />
              <Route path='/EditLabel/:id'element={<EditLabel/>} />
              <Route path='/Issues'element={<GetIssueList/>} />
              <Route path='/Requirement'element={<GetRequirement/>} />
              <Route path='/Edit_Issues/:id'element={<EditIssues/>} />
              <Route path='/Edit_Requirement/:id'element={<EditReq/>} />
              <Route path='/Project-Chart/'element={<ProjectChart/>} />
              <Route path='/Create-Requirement/'element={<CreateReq/>} />
              <Route path='/Create-Issues/'element={<CreateIssue/>} />
            </Routes>
              </UserContext.Provider>
          </div>
      </Router>
      
<ToastContainer/>
    </>
  );
}

export default App;