import { useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
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

import './NewPlace.css';

const NewPlace = () => {
  const navigate = useNavigate();
  const { getToken } = useToken();
  const { sendRequest, isLoading, openModal, closeModal, error } =
    useHttpRequest();
  const { id } = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { title, description, address } = formState.inputs;
    const token = getToken();
    const place = {
      title: title.value,
      description: description.value,
      address: address.value,
      location: 'Location',
    };

    try {
      await sendRequest(
        `${apiTypes.URL_MAIN}${apiTypes.API_PLACES_ROUTE}/new`,
        'POST',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
        place
      );

      navigate(`/${id}/places`);
    } catch (err) {}
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <Modal isModalOpen={openModal} closeModal={closeModal} />}
      <form className='place-form' onSubmit={onSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (at least 5 characters).'
          onInput={inputHandler}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputHandler}
          value={formState.inputs.address.value}
          valid={formState.inputs.address.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
