import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import Modal from '../../../shared/components/Modal/Modal';
import LoadingSpinner from '../../../shared/components/Spinner/LoadingSpinner';
import { useForm, useHttpRequest, useToken } from '../../../shared/hooks/index';
import { AuthContext } from '../../../shared/context/auth-context';
import { apiTypes } from '../../../shared/constants';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/util/validation/validators';

import './UpdatePlace.css';

const UpdatePlace = () => {
  const { pid } = useParams();
  const [place, setPlace] = useState();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { getToken } = useToken();
  const { sendRequest, isLoading, openModal, closeModal, error } =
    useHttpRequest();
  const [formState, inputHandler, updateFormState] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlaceById = async () => {
      try {
        const data = await sendRequest(
          `${apiTypes.URL_MAIN}${apiTypes.API_PLACES_ROUTE}/${pid}`
        );

        const { title, description } = data;

        if (title && description) {
          updateFormState(
            {
              title: {
                value: title,
                isValid: true,
              },
              description: {
                value: description,
                isValid: true,
              },
            },
            true
          );
          setPlace(data);
        }
      } catch (err) {}
    };
    getPlaceById();
  }, [updateFormState, pid, sendRequest]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const token = getToken();
    const data = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    };

    try {
      const {
        place: { user },
      } = await sendRequest(
        `${apiTypes.URL_MAIN}${apiTypes.API_PLACES_ROUTE}/${pid}`,
        'PATCH',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
        data
      );
      navigate(`/${user}/places`);
    } catch (err) {}
  };

  if (!isLoggedIn) {
    navigate('/');
  }

  if (!place) {
    return (
      <div className='center'>
        <h3>Could not find the place.</h3>
      </div>
    );
  }

  return (
    <Fragment>
      {error && (
        <Modal isModalOpen={openModal} closeModal={closeModal} error={error} />
      )}
      {isLoading && <LoadingSpinner asOverlays />}
      <form className='place-form' onSubmit={onSubmitHandler}>
        <Input
          id='title'
          type='text'
          element='input'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
          value={place.title}
          valid={true}
        />
        <Input
          id='description'
          type='textarea'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid title (at least 5 characters).'
          onInput={inputHandler}
          value={place.description}
          valid={true}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Update Place
        </Button>
      </form>
    </Fragment>
  );
};

export default UpdatePlace;
