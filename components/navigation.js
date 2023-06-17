
import {ImStatsBars} from 'react-icons/im'


function Nav() {
    return ( 
    <header className='container max-w-2xl p-6 mx-auto' >
    <div className="flex items-center justify-between">
      {/*User Information*/}
      <div className="flex items-center gap-2">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            {/*User Photo*/}
        <img 
        className="w-full object-cover" 
        src="https://lh3.googleusercontent.com/a/AAcHTteO5nr30IQrqppHOd2C7Y9RB2S5vg2028ibX9P0eA=s83-c-mo" 
        alt="Profile Image"/>
        </div>
         {/*User Name*/}
        <small>Hi Charlley JJ</small>
      </div>
         {/*Icon and Button*/}
      <nav className="flex items-center gap-2">
        <div>
          <ImStatsBars className='text-2xl'/>
        </div>

        <div>
          <button className='btn btn-danger'>Log off</button>
        </div>
      </nav>
    </div>
  </header>
  );
}

export default Nav