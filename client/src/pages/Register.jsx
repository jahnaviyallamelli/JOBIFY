import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo ,SubmitBtn} from "../components"
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action=async ({request})=>{
  const formData=await request.formData();
  const data=Object.fromEntries(formData);
  try{
    await customFetch.post('/auth/register',data);
    toast.success('Registration Successfull');
    return redirect('/login');
  }catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Register = () => {
  
  return (
   <Wrapper>
     <Form method="post" className="form">
      <Logo/>
      <h4>Register</h4>
      <FormRow type="text" name="name"/>
      <FormRow type="text" name="Last Name"/>
      <FormRow type="text" name="location"/>
      <FormRow type="text" name="email"/>
      <FormRow type="password" name="password"/>
      <SubmitBtn/>
      <p>Already a member? 
        <Link to="/login" className="member-btn">Login</Link>
      </p>
     </Form>
   </Wrapper>
  )
}

export default Register