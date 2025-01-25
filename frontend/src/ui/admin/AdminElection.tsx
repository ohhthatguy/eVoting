import {useContext} from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { electionCreationSchema, electionCreationType } from './zod-schema-admin'

import { AuthContext } from '../../context/auth'


import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AdminElection = () => {
  const user = useContext(AuthContext)

  const { register } = useForm<electionCreationType>({
    resolver: zodResolver(electionCreationSchema)
  })

// handle from here
  return (<>
        <div className='bg-slate-700 h-screen'>

            <div>{`Election Creating By ${user?.user?.fullName}`}</div>

          <div>
            <form>

              <Input placeholder='election title' {...register('electionTitle')} />

              <div className='border-2 border-red-300'>

                  <Input placeholder='candidate Name'/>
                  <Input placeholder='Party Name'/>
                  <Input placeholder='candidate profile'/>
                  <Input placeholder='party logo'/>
                  {/* <Input placeholder='vote'/> */}

              </div>

                <div className='border-2 border-green-400 flex justify-between'>

                  <Button variant={'outline'}>Add</Button>
                  <Button variant={'default'}>Done!</Button>

                </div>


            </form>
          </div>


        </div>
  </>)
}

export default AdminElection