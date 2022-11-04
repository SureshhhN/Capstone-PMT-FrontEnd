import axios from 'axios';

export let login = async(val)=>{  
   

        try {
          let res =  await axios.post('http://localhost:3000',val)
            if(res)
            {
              return res.data 
            }
            else{
                return res.data
            } 
        } catch (error) {
          alert("error occured please contact the developer")
          console.log(error)
        } 
      
  }