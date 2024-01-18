import { Fragment, useContext, useEffect } from 'react';
import PlaceList from '../../components/PlaceList/PlaceList';
import Modal from '../../../shared/components/Modal/Modal';
import LoadingSpinner from '../../../shared/components/Spinner/LoadingSpinner';
import { useHttpRequest } from '../../../shared/hooks/index';
import { PlaceContext } from '../../../shared/context/place-context';
import { apiTypes } from '../../../shared/constants';

import './AllPlaces.css';

const AllPlaces = () => {
  const { setPlacesData, places } = useContext(PlaceContext);
  const { sendRequest, isLoading, openModal, closeModal, error } =
    useHttpRequest();

  useEffect(() => {
    const getAllPlaces = async () => {
      const data = await sendRequest(
        `${apiTypes.URL_MAIN}${apiTypes.API_PLACES_ROUTE}/`
      );
      setPlacesData(data.places);
    };
    getAllPlaces();
  }, [sendRequest, setPlacesData]);

  return (
    <Fragment>
      {error && (
        <Modal isModalOpen={openModal} closeModal={closeModal} error={error} />
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList items={places} />
    </Fragment>
  );
};

export default AllPlaces;
