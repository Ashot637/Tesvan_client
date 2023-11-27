import React, { useEffect, useRef, useState } from 'react';
import classes from '../../styles/form.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../helpers/axios';

const EditNewHeaderImg = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [selectedDevice, setSelectedDevice] = useState();
  const [devices, setDevices] = useState();
  const [isOpenDevices, setIsOpenDevices] = useState('');
  const [description, setDescription] = useState('');
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      axios.get('/img/header/' + id).then(({ data }) => {
        setTitle(data.title);
        setImageUrl(data.img);
        setDeviceId(data.deviceId);
        setDescription(data.description);
        setIsOpenDevices(false);
        setSelectedDevice(data.device);
      });
    } else {
      setTitle('');
      setImageUrl('');
      setDescription('');
      setIsOpenDevices(false);
    }
  }, [id]);

  useEffect(() => {
    axios.get('/devices', { params: { byId: true, page: 1, limit: 5000 } }).then(({ data }) => {
      if (data.devices.length) {
        setDevices(data.devices);
        if (!id) {
          setSelectedDevice(data.devices[0]);
          setDeviceId(data.devices[0].id);
        }
      }
    });
  }, [id]);

  const onUploadFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event?.currentTarget?.files && event?.currentTarget?.files[0];
      formData.append('img', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch {
      alert('Failed to Upload an Image');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', imageUrl);
    formData.append('title', title);
    formData.append('deviceId', deviceId);
    formData.append('description', description);
    if (!id) {
      axios
        .post('/img/header', formData)
        .then(({ data }) => {
          setTitle('');
          setImageUrl('');
          setDeviceId('');
          navigate('/admin/header-imgs');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/img/header/' + id, formData)
        .then(({ data }) => {
          setTitle('');
          setImageUrl('');
          setDeviceId('');
          navigate('/admin/header-imgs');
        })
        .catch((e) => console.log(e));
    }
  };

  const onChangeDeviceId = (item) => {
    setSelectedDevice(item);
    setIsOpenDevices(false);
    setDeviceId(item.id);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.field}>
        <label>Title</label>
        <input
          type="text"
          className={classes.name}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Description</label>
        <input
          type="text"
          className={classes.name}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Device</label>
        <div
          className={[
            classes.select,
            classes.selectDevice,
            isOpenDevices ? classes.active : undefined,
          ].join(' ')}
          onClick={() => setIsOpenDevices((isOpenDevices) => !isOpenDevices)}>
          {selectedDevice && (
            <>
              <img
                src={'http://localhost:8080/' + selectedDevice.images[0]}
                alt={selectedDevice.title}
              />
              <p>{selectedDevice?.title}</p>
              <span>{selectedDevice.price} AMD</span>
            </>
          )}
        </div>
        {isOpenDevices && (
          <div className={classes.options}>
            {!!devices?.length &&
              devices.map((item) => {
                if (item.id === id) return undefined;
                return (
                  <div
                    className={[classes.select, classes.selectDevice].join(' ')}
                    key={item.id}
                    onClick={() => onChangeDeviceId(item)}>
                    <img src={'http://localhost:8080/' + item.images[0]} alt={item.title} />
                    <p>{item?.title}</p>
                    <span>{item.price} AMD</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className={classes.upload} onClick={() => fileRef.current.click()}>
        {imageUrl ? 'Change image' : 'Upload image'}
      </div>
      <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={onUploadFile} />
      {imageUrl && <img src={'http://localhost:8080/' + imageUrl} height={150} alt="Device" />}
      <button
        type="submit"
        className={classes.btn}
        disabled={!title.trim() || !deviceId || !imageUrl || !description}>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewHeaderImg;
