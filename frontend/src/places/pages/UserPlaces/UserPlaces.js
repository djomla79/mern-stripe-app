import { Fragment, useContext, useEffect } from 'react';
import PlaceList from '../../components/PlaceList/PlaceList';
import Modal from '../../../shared/components/Modal/Modal';
import LoadingSpinner from '../../../shared/components/Spinner/LoadingSpinner';
import { useHttpRequest } from '../../../shared/hooks/index';
import { AuthContext } from '../../../shared/context/auth-context';
import { PlaceContext } from '../../../shared/context/place-context';
import { apiTypes } from '../../../shared/constants';

import './UserPlaces.css';

const UserPlaces = () => {
  // const { userId } = useParams();
  const { isLoggedIn, id } = useContext(AuthContext);
  const { setUserPlacesData, userPlaces } = useContext(PlaceContext);
  const { sendRequest, isLoading, openModal, closeModal, error } =
    useHttpRequest();

  useEffect(() => {
    const getUserPlaces = async () => {
      const data = await sendRequest(
        `${apiTypes.URL_MAIN}${apiTypes.API_PLACES_ROUTE}/user/${id}`
      );
      setUserPlacesData(data.places);
    };
    getUserPlaces();
  }, [sendRequest, id, setUserPlacesData]);

  return (
    <Fragment>
      {error && (
        <Modal isModalOpen={openModal} closeModal={closeModal} error={error} />
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      {isLoggedIn && <PlaceList items={userPlaces} />}
    </Fragment>
  );
};

export default UserPlaces;
