import { Form, redirect, useNavigation, Link, useNavigate } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo,SubmitBtn } from "../components"
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action=async({request})=>{
  const formData= await request.formData();
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/login',data);
    toast.success('Login Successfull');
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Login failed');
    console.log(error);
  }
  return null;
}
const Login = () => {
  const navigate= useNavigate();

  const LoginDemoUser = async()=>{
    const data={
      email:'demo@gmail.com',
      password:'12345678'
    }
    try {
      await customFetch.post('/auth/login',data);
      toast.success('Have a Look');
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Login failed');
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
      <Logo/>
      <h4>Login</h4>
      <FormRow type="text" name="email"/>
      <FormRow type="password" name="password"/>
      <SubmitBtn />
      <button type="button" className="btn btn-block" onClick={LoginDemoUser}>Explore the App</button>
      <p>Not a member yet? 
        <Link to="/register" className="member-btn">Register</Link>
      </p>
      </Form>
    </Wrapper>
  )
}

export default Login