import { useState, useCallback } from 'react';

const useModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const setLoading = useCallback((value) => {
    setIsLoading(value);
  }, []);

  const setModal = useCallback((value) => {
    setOpenModal(value);
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return { isLoading, setLoading, openModal, setModal, closeModal };
};

export default useModal;
