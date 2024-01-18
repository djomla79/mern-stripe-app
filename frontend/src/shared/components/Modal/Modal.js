import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';

import './Modal.css';

const Modal = ({ children, isModalOpen, closeModal, text, error }) => {
  const content = (
    <div onClick={closeModal} className='overlay'>
      <div onClick={(e) => e.stopPropagation()} className='container'>
        <div className='content'>
          {text && (
            <div className='text'>
              <div className='text-content'>{text}</div>
            </div>
          )}
          {error && (
            <div className='text'>
              <div className='text-content'>{error}</div>
            </div>
          )}
          {children}
        </div>
        <Button danger onClick={closeModal} className='btn-modal'>
          Exit
        </Button>
      </div>
    </div>
  );
  const overlay = ReactDOM.createPortal(
    content,
    document.getElementById('modal')
  );
  return <Fragment>{isModalOpen && overlay}</Fragment>;
};

export default Modal;
