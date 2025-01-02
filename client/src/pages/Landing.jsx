import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Logo } from '../components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sapiente 
            placeat quaerat fugit quis voluptates, ipsum eos natus earum officia per
            spiciatis enim omnis dolore? Minima, saepe sequi doloremque, ut suscipit cum
             nostrum quia iusto, nihil expedita nesciunt consequatur labore minus molesti
             as provident. Blanditiis itaque eos minima aspernatur! Nemo, autem ex!</p>
          <Link to="/register" className="btn register-link">Register</Link>
          <Link to="/login" className='btn'> Login/ Demo User</Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img'/>
      </div>
    </Wrapper>
  )
}

export default Landing