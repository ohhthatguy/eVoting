import { Button } from "@/components/ui/button"


const Homepage = () => {

  const description = [

    {
      name: 'Convenience',
      text: 'Voters can cast their votes securely from anywhere, at any time, eliminating the need for physical presence or long queues. This makes voting accessible to more people, including those with mobility issues or time constraints'
    },

    {
      name: 'Security',
      text: 'With advanced encryption and user authentication, the platform ensures that votes are secure and tamper-proof. This builds trust in the system, ensuring that each vote is counted accurately and confidentially'
    },

    {
      name: 'Transparency and Efficiency',
      text: 'The system provides instant results and ensures transparency by allowing real-time vote tracking. This reduces the possibility of errors or delays, making the entire process faster and more reliable.'
    },

  ]

  const help = [
    {
      name: 'Creating New Account',
      text: ' You Need to Put Your Citizenship Number and Phone Number'
    },
   
    {
      name: 'Already Have Account?',
      text: ' Simply login with right credential and vote if Admin created Election is still active.'
    }
  ]


  return (<>
    
      {/* heroSection */}
        <div className=' relative  bg-[url("parliament.jpg")] bg-cover h-screen  '>
          
          <div className="h-screen w-full bg-zinc-800 opacity-40 absolute "></div>

          <div className=" absolute w-full h-screen ">
            
            <div className=" text-white mt-[28%] w-[60%] p-3 bg-slate-900 bg-opacity-15">

              <h1 className="text-4xl font-bold text-white mb-3">Welcome To e-Voting</h1>
            
              <section className="text-xl mb-3 font-semibold">
              Vote Easily, Anytime, Anywhere! Our online voting system makes voting simple, secure, and fast. Have your say with just a click!
              </section>

<a href="#secondPart">
              <Button  className="hover:scale-110 active:bg-red-700 active:scale-100 ">Learn More</Button>
              </a>

            </div>

          </div>
        
        </div>
   
      {/* GetStartedPart */}
      <div id="secondPart" className='h-screen bg-gradient-to-r from-cyan-600 to-blue-700 flex justify-center items-center'>

        <div className="absolute left-[-7rem]">
          <img src="flag.png" className="h-screen  " alt="flag" />
        </div>


        <div>

          <div className="text-center mb-24">
            <h1 className="text-4xl font-bold text-white ">What & Why ?</h1>

            <section className="text-white font-semibold">Our <span className="text-2xl font-extrabold text-red-500">e-Voting</span> web application provides a secure, convenient, and transparent way for users to cast their votes online.</section>
          </div>

          <div className="flex justify-center items-center gap-8 p-2  ">
        {
            description.map((e,index) => (
              <div key={index} className=" border-2 shadow-2xl duration-300 scale-100 hover:scale-105 hover:cursor-pointer flex justify-center items-center flex-col gap-4 bg-slate-600 opacity-90 rounded-md">

                <header className=" text-center text-2xl text-white font-bold">
                  {e.name}
                </header>

                <section className="p-2 font-semibold text-slate-200 text-xl  border-2 ">
                  {e.text}
                </section>
              </div>
            ))
          

        }
        </div>

        </div>
        
       
        

      </div>

      {/* final */}
      <div id="lastPart" className='h-screen bg-gradient-to-r from-blue-700 to-blue-900 flex justify-center items-center'>

      <div>

        <div className="text-center mb-24">
          <h1 className="text-4xl font-bold text-white ">How To Get Started ?</h1>

          <section className="text-white font-semibold"> Login if You already have an account made else you have to signUp first then You can Enter. If Admin has setUp the election which is still active, then you can login to Vote and after election can see result in the history section of your account. </section>
        </div>

        <div className="flex justify-center items-center gap-8 p-2  ">
        {
          help.map((e,index) => (

            <div key={index} className=" border-2 shadow-2xl duration-300 scale-100 hover:scale-105 hover:cursor-pointer flex justify-center items-center flex-col gap-4 bg-slate-600 opacity-90 rounded-md w-96 ">


              <header className=" text-center text-2xl text-white font-bold">
                {e.name}
              </header>

              <section className="p-2 font-semibold text-slate-200 text-xl  border-2 h-40">
                {e.text}
              </section>


            </div>
          ))


        }
        </div>

      </div>


      </div>

  </>)
}

export default Homepage