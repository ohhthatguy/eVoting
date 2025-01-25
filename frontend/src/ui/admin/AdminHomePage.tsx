import {useContext} from 'react'
import { AuthContext } from '../../context/auth'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

const AdminHomePage = () => {
  const user = useContext(AuthContext)
const navigate = useNavigate()


  return (
    <div className='bg-slate-700 h-screen'>

      <div>
        {`Welcome Admin, mr. ${user?.user?.fullName}`}
      </div>

      <div>

      <Button className="btn btn-wide focus:outline-0" onClick={()=> navigate("/admin-election")}>election creation</Button>


      </div>


    </div>
  )
}

export default AdminHomePage