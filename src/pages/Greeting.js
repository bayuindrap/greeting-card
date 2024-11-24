import React, { useState, useRef } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function GreetingCard() {
  const [formState, setFormState] = useState({
    dear: '',
    message: '',
    from: '',
    image: null,
  });

  const [alert, setAlert] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const cardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setImageURL(URL.createObjectURL(file));
      setFormState({ ...formState, image: file });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'gift-card.png');
        }
      });
    } catch (err) {
      console.error('Error generating image:', err);
      setAlert('Error generating image.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dear, message, from, image } = formState;

    if (!dear || !message || !from || !image) {
      setAlert('All fields and image upload are required.');
      return;
    }

    handleDownload();
  };

  return (
    <div className="container">

      {alert && <Alert color="danger" fade={false}>{alert}</Alert>}

      <div style={{
        position: 'relative',
        textAlign: 'center',
        marginBottom: '20px',
        maxWidth: '100%',
        margin: '0 auto',
      }}>
        {imageURL ? (
          <div ref={cardRef} style={{ position: 'relative' }}>
            <img
              src={imageURL}
              alt="Uploaded Template"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              crossOrigin="anonymous"
            />
            <div style={{
              position: 'absolute',
              top: '31%',      
              left: '49%', 
              color: '#000',
              textAlign: 'left',
              fontSize: '16px',
              fontFamily: 'Arial',
              transform: 'translateX(-50%)',
            }}>
              {formState.dear}
            </div>
            <div style={{
              position: 'absolute',
              top: '39%',   
              left: '55%',  
              color: '#000',
              textAlign: 'left',
              fontSize: '16px',
              fontFamily: 'Arial',
              width: '50%',
              transform: 'translateX(-50%)',
            }}>
              {formState.message}
            </div>
            <div style={{
              position: 'absolute',
              top: '56%',       
              left: '45%',      
              color: '#000',
              textAlign: 'left',
              fontSize: '16px',
              fontFamily: 'Arial',
              transform: 'translateX(-50%)',
            }}>
              {formState.from}
            </div>
          </div>
        ) : (
          <div style={{
            border: '2px dashed #ccc',
            borderRadius: '4px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#f8f9fa'
          }}>
            <p className="mb-0">Please upload an image</p>
          </div>
        )}
      </div>

      <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <FormGroup>
          <Label for="image">Upload Template Image</Label>
          <Input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dear">Name</Label>
          <Input
            type="text"
            name="dear"
            id="dear"
            placeholder="Enter name"
            value={formState.dear}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="message">Message</Label>
          <Input
            type="textarea"
            name="message"
            id="message"
            placeholder="Enter your message"
            value={formState.message}
            onChange={handleChange}
            style={{ height: '100px' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="from">From</Label>
          <Input
            type="text"
            name="from"
            id="from"
            placeholder="Enter your name"
            value={formState.from}
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          color="success"
          type="submit"
          style={{
            width: '100%',
            marginTop: '1rem'
          }}
        >
          Download
        </Button>
      </Form>
    </div>
  );
}

export default GreetingCard;
