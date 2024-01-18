import { Fragment, useContext, useEffect } from 'react';
import UserList from '../components/UserList';
import LoadingSpinner from '../../shared/components/Spinner/LoadingSpinner';
import Modal from '../../shared/components/Modal/Modal';
import { useHttpRequest } from '../../shared/hooks/index';
import { AuthContext } from '../../shared/context/auth-context';
import { apiTypes } from '../../shared/constants';

const Users = () => {
  const { setUsersData, users } = useContext(AuthContext);
  const { sendRequest, isLoading, openModal, error, closeModal } =
    useHttpRequest();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `${apiTypes.URL_MAIN}${apiTypes.API_USERS_ROUTE}`
        );

        setUsersData(data.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, setUsersData]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && (
        <Modal error={error} isModalOpen={openModal} closeModal={closeModal} />
      )}
      <UserList users={users} />;
    </Fragment>
  );
};

export default Users;
