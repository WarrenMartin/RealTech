import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Button, ButtonGroup, Spacer } from '@chakra-ui/react'; // Import Spacer for better spacing
// import {propertyTable} from '../pages/Property'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const Tasks=()=>{
    return 
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Achiever Zone</h1>
        </Link>
        <nav>

        {user && (
            <Button colorScheme="teal" size="md" mr="2" onClick={Tasks}>
              Tasks
            </Button>
          )}
        {user && (
            <Link to="/property"> {/* Use Link to navigate to the Property page */}
              <Button colorScheme="teal" size="md" mr="2">
                Property
              </Button>
            </Link>
          )}

        {user && (
            <Link to="/EmailMarketing"> {/* Use Link to navigate to the Property page */}
              <Button colorScheme="teal" size="md" mr="2">
                EmailMarketing
              </Button>
            </Link>
          )}

      

            
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              {/* you can click on this to remove signup */}
              <Link to="/signup">Signup</Link>
            </div>
          )}

          
        </nav>
      </div>
    </header>
  )
}

export default Navbar

