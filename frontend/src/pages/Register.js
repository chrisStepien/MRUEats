import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../styles/Register.css';

function Register() {
    //Add delivery_loc
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        delivery_loc: '',
        password: '',
        password_c: ''
    });

    const { firstname, lastname, email, delivery_loc, password, password_c } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    }

    const onSubmit = (e) => {

        e.preventDefault();

        //if none inputed
        if(!firstname && !lastname && !email && !delivery_loc && !password && !password_c)
        {
            toast.error('Form not filled');
            return;
        }

        //email address validation
        const regex = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
        if(!regex.test(email)){
            toast.error('Please enter a valid email address');
            return;
        }
        //password check
        if (password !== password_c) {
            toast.error('Password does not match');
            return;
        }
        if(password.length < 6)
        {
            toast.error('Your password length is not sufficient');
            return;
        }
        else {
            const userData = {
                firstname,
                lastname,
                email,
                delivery_loc,
                password,
                password_c
            }
            dispatch(register(userData));
        }
    }

    if (isLoading) {
        return <Spinner />;
    }


    return (
        <div class="main-container">
            <div class="box">
                <div className="title">
                <h3>Register</h3>
                </div>
                <form onSubmit={onSubmit}>
                    <div className='fName'>
                        <label for="first-name">First Name</label>
                        <input type="text" id="firstname" name="firstname" value={firstname} placeholder='Enter your first name' onChange={onChange} />
                    </div>
                    <div className='lName'>
                        <label for="last-name">Last Name</label>
                        <input type="text" id="lastname" name="lastname" value={lastname} placeholder='Enter your last name' onChange={onChange} />
                    </div>
                    <div className='email'>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className='pass1'>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" value={password} placeholder='Enter password' onChange={onChange} />
                    </div>
                    <div className='pass2'>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="password_c" name="password_c" value={password_c} placeholder='Confirm password' onChange={onChange} />
                    </div>
                    <div className='dLocation'>
                        <label for="deliveryLoc">Delivery Location</label>
                        <input type="text" id="dLocation" name="delivery_loc" value={delivery_loc} placeholder='Enter delivery location Ex.(B140 or 123 Street SE)' onChange={onChange} />
                    </div>
                    <div className='submitbtn'>
                        <input id="register-button" type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
