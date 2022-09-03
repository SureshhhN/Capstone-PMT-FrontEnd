import React, {useContext} from 'react'
import { UserContext } from '../UserContext'
import Navmenu from './Navmenu'


function About() {
    const {user} = useContext(UserContext)

  return (
    <div>
      <Navmenu/>
        <h3>ABOUT</h3>
        <div className="mx-auto align-self-center" style={{width: '400px', textAlign:'center'}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRds5HNmWCTB6fUxbKkr4dd0BaZznbOYd0aow&usqp=CAU" style={{width:'200px', height:"300px"}}/>
        <p style={{marginTop:"13px"}}><b>Name: </b><b>SURESH</b></p>
        <p style={{marginTop:"02px"}} ><b>Email ID: </b><b>example@gmail.com</b></p>
        <p><b>Phone Number:</b><b> 9876543210</b></p>
        </div>
       
        
    </div>
  )
}

export default About