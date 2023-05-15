import { Link } from 'react-router-dom'

import Ellipse1 from '../assets/bg-img/ellipse-1.svg'
import Ellipse2 from '../assets/bg-img/ellipse-2.svg'
import Ellipse3 from '../assets/bg-img/ellipse-3.svg'
import Logo from '../assets/logo/logo-white.svg'

// bootstrap
import { Button } from 'react-bootstrap'


const StartPage = () => {
  


  return (
    <>
        <div className='circles'>
            <img src={Logo} className="circle startLogo" />
            <div className='buttonGroup' style={{bottom:'20%'}}>
              <Link to="/login" style={{textDecoration:'none'}}>                
                <Button className='btn btn-lg btn-font start-button'>Login</Button>
              </Link>
              <Link to="/signup" style={{textDecoration:'none'}}>
                <Button className='btn btn-lg btn-font start-button'>Join AArtis</Button>               
              </Link>
            </div>  

            <img src={Ellipse1} className="circle circle1" />
            <img src={Ellipse2} className="circle circle2" />
            <img src={Ellipse3} className="circle circle3" />
        </div>
        
        
        
    </>
  )
}

export default StartPage