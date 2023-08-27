
import {ImStatsBars} from 'react-icons/im'
import { useContext } from 'react';
import { authContext } from '@/lib/store/auth-context.js';


function Nav() {

  
  const values =  useContext(authContext);
  const {user,loading,logout} = values;
 

    return ( 
    <header className='container max-w-2xl p-6 mx-auto' >
    <div className="flex items-center justify-between">
      {/*User Information*/}
      {user && !loading && (
        <div className="flex items-center gap-2">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            {/*User Photo*/}
        <img 
        className="w-full object-cover" 
        src={user.photoURL}
        alt={user.displayName}
        referrerPolicy="no-referrer"/>

        </div>
         {/*User Name*/}
        <small>Hi {user.displayName}</small>
      </div>
      )}
     
         {/*Icon and Button*/}
         {user && !loading && (
      <nav className="flex items-center gap-4">
        <div>
          <ImStatsBars className='text-2xl'/>
        </div>

        <div>
          <button onClick={logout} className='btn btn-danger'>Log off</button>
        </div>
      </nav>
       )}
    </div>
  </header>
  );
}

export default Nav