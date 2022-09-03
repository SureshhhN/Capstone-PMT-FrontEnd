import React, {useState} from 'react'
import CreateLabel from './CreateLabel'
import GetLabel from './GetLabel'
import Navmenu from './Navmenu'


function Labels() {
  const [LabelScreen, setLabelScreen]= useState(<GetLabel/>)
  const [AddLabel, setAddLabel] = useState()

  return (
    <div>
      <Navmenu/>
      <h3>Labels List</h3>
      <div class="d-flex justify-content-end">
      {AddLabel?
<button type="button" class="btn btn-secondary" onClick={()=>
  {
    setAddLabel()
    setLabelScreen(<GetLabel/>)}
    }>Close</button>
:<button type="button" class="btn btn-success" onClick={()=>{
  setAddLabel(true)
  setLabelScreen(<CreateLabel/>)}}>Add Label</button>
  }
                </div>
<div>
{LabelScreen}
</div>
      
    </div>
  )
}

export default Labels