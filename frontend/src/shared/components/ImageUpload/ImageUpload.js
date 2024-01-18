import { useRef, useEffect, useState } from 'react';
import Button from '../Button/Button';

import './ImageUpload.css';

const ImageUpload = ({ id, onInput, center, error }) => {
  const [file, setFile] = useState();
  const [filePreviewUrl, setFilePreviewURl] = useState();
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      setFilePreviewURl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const onClickPickImageHandler = () => {
    inputRef.current.click();
  };

  const onChangekPickImageHandler = (event) => {
    const files = event.target.files;
    let pickedFile;
    let fileIsValid = isValid;

    if (files && files.length === 1) {
      pickedFile = files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <div className='form-control'>
      <input
        id=''
        ref={inputRef}
        type='file'
        accept='.jpg,.png,.jpeg'
        style={{ display: 'none' }}
        onChange={onChangekPickImageHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className='image-upload__preview'>
          {filePreviewUrl && <img src={filePreviewUrl} alt='Preview' />}
          {!filePreviewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={onClickPickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{error}</p>}
    </div>
  );
};

export default ImageUpload;
