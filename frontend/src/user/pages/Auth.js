import { useState, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   GoogleOAuthProvider,
//   useGoogleLogin,
//   GoogleLogin,
// } from '@react-oauth/google';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Modal from '../../shared/components/Modal/Modal';
import LoadingSpinner from '../../shared/components/Spinner/LoadingSpinner';
// import ImageUpload from '../../shared/components/ImageUpload/ImageUpload';
import { useForm, useHttpRequest } from '../../shared/hooks/index';
import { AuthContext } from '../../shared/context/auth-context';
import { apiTypes } from '../../shared/constants';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validation/validators';

import './Auth.css';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginOrSigup, setIsLoginOrSignup] = useState(true);
  const navigate = useNavigate();
  const { sendRequest, isLoading, openModal, error, closeModal } =
    useHttpRequest();
  const [formState, inputHandler, updateFormState] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const toggleLoginSignup = () => {
    if (!isLoginOrSigup) {
      updateFormState(
        {
          ...formState.inputs,
          name: undefined,
          // image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      updateFormState(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          // image: {
          //   value: null,
          //   isValid: false,
          // },
        },
        false
      );
    }
    setIsLoginOrSignup((prevState) => !prevState);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { name, email, password } = formState.inputs;
    // const formData = new FormData();
    let user = {};

    if (name) {
      // formData.append('name', name.value);
      // formData.append('email', email.value);
      // formData.append('password', password.value);
      // formData.append('image', image.value);
      user = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
    } else {
      user = {
        email: email.value,
        password: password.value,
      };
    }

    if (isLoginOrSigup) {
      try {
        const data = await sendRequest(
          `${apiTypes.URL_MAIN}${apiTypes.API_USERS_ROUTE}/login`,
          'POST',
          {
            headers: { 'Content-Type': 'application/json' },
          },
          user
        );
        const { id, accessToken } = data;

        login(id, accessToken);
        navigate(`/${id}/places`);
      } catch (err) {}
    } else {
      try {
        const data = await sendRequest(
          `${apiTypes.URL_MAIN}${apiTypes.API_USERS_ROUTE}/signup`,
          'POST',
          {
            headers: { 'Content-Type': 'application/json' },
          },
          user
        );
        const { id, accessToken } = data;

        login(id, accessToken);
        navigate(`/${id}/places`);
      } catch (err) {}
    }
  };

  // TESTING GOOGLE AUTH WITH @react-oauth/google library
  // const loginUser = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     console.log('response in useGoogleLogin: ', response);
  //     try {
  //       const res = await axios.post(
  //         `${apiTypes.URL_MAIN}${apiTypes.API_USERS_ROUTE}/login/google`,
  //         { credentials: response.access_token },
  //         {
  //           'Content-Type': 'application/json',
  //           // headers: {
  //           //   Authorization: `Bearer ${response.access_token}`,
  //           // },
  //         }
  //       );
  //       console.log('res in useGoogleLogin: ', res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // });

  return (
    <Fragment>
      {error && (
        <Modal error={error} closeModal={closeModal} isModalOpen={openModal} />
      )}
      <Card className='authentication'>
        {/*<button onClick={loginUser}>
          <i class='fa-brands fa-google'></i>
          Continue with google
        </button>
        <GoogleLogin
          onSuccess={(response) => {
            console.log('response in GoogleLogin component: ', response);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />*/}
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={onSubmitHandler}>
          {!isLoginOrSigup && (
            <Input
              id='name'
              type='text'
              element='input'
              label='Name'
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter you name.'
              value={formState.inputs.name.value}
              valid={formState.inputs.name.isValid}
            />
          )}
          {/* !isLoginOrSigup && (
            <ImageUpload
              id='image'
              center
              onInput={inputHandler}
              error={error}
            />
          ) */}
          <Input
            id='email'
            type='email'
            element='input'
            label='Email'
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText='Email is not valid, please try again.'
            value={formState.inputs.email.value}
            valid={formState.inputs.email.isValid}
          />
          <Input
            id='password'
            type='password'
            element='input'
            label='Password'
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText='Password is not valid, enter min 8 characters.'
            value={formState.inputs.password.value}
            valid={formState.inputs.password.isValid}
          />
          <Button
            type='submit'
            disabled={!formState.isValid}
            className='btn-login'
          >
            {isLoginOrSigup ? 'Login' : 'Signup'}
          </Button>
        </form>
        <div>or</div>
        <Button onClick={toggleLoginSignup} className='btn-login'>
          Switch to {isLoginOrSigup ? 'Signup' : 'Login'}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
