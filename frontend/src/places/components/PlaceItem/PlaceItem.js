import { useState, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import Modal from '../../../shared/components/Modal/Modal';
import LoadingSpinner from '../../../shared/components/Spinner/LoadingSpinner';
import { PlaceContext } from '../../../shared/context/place-context';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpRequest, useToken } from '../../../shared/hooks/index';
import { apiTypes } from '../../../shared/constants/index';

import './PlaceItem.css';

const PlaceItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setPlaceId, removePlaceById } = useContext(PlaceContext);
  const { id: userId } = useContext(AuthContext);
  const { sendRequest, isLoading, openModal, closeModal, error } =
    useHttpRequest();
  const { id, title, address, description, user } = item;
  const { getToken } = useToken();

  const onModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onNavigateToUpdatePlace = () => {
    setPlaceId(id);
    navigate(`/places/${id}`);
  };

  const onDeleteHandler = async () => {
    const token = getToken();
    try {
      await sendRequest(
        `${apiTypes.URL_MAIN}${apiTypes.API_PLACES_ROUTE}/${id}`,
        'DELETE',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      removePlaceById(id);
    } catch (err) {}
    setIsModalOpen(false);
  };

  // const onPaymentHandler = (e) => {
  //   e.preventDefault();
  //   navigate('/payment');
  // };

  return (
    <Fragment>
      {error && (
        <Modal isModalOpen={openModal} closeModal={closeModal} error={error} />
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      <div className='place-item'>
        <Card>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            {user === userId && (
              <Button inverse onClick={onNavigateToUpdatePlace}>
                Edit
              </Button>
            )}
            {user === userId && (
              <Button onClick={onModalOpen} danger>
                Delete
              </Button>
            )}
            {/*user === userId && (
              <Button onClick={onPaymentHandler}>
                Go to Payment
              </Button>
            )*/}
          </div>
        </Card>
        <Modal
          isModalOpen={isModalOpen}
          closeModal={onCloseModal}
          text='Do you really want to delete this item?'
        >
          <Button onClick={onDeleteHandler} className='actions'>
            Delete
          </Button>
        </Modal>
      </div>
    </Fragment>
  );
};

export default PlaceItem;
