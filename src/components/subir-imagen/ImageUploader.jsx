import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './ImageUploader.css';

const ImageUploader = ({ initialImage, onImageSelected }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [previousImage, setPreviousImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialImage) {
            setCurrentImage(initialImage);
            setPreviousImage(initialImage);
        }
    }, [initialImage]);

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviousImage(currentImage); // Guardar imagen actual como anterior
                setCurrentImage(reader.result); // Establecer nueva imagen
                onImageSelected(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        if (previousImage) {
            setCurrentImage(previousImage); // Revertir a la imagen anterior
        }
    };

    return (
        <div className="image-uploader">
            <div className="image-container">
                {currentImage && (
                    <>
                        <img 
                            src={currentImage} 
                            alt="Vista previa" 
                            className="preview-image"
                        />
                        <button 
                            className="cancel-button"
                            onClick={handleCancel}
                            title="Cancelar cambio"
                        >
                            <FaTimes />
                        </button>
                    </>
                )}
            </div>

            <button 
                className="upload-button"
                onClick={handleFileUpload}
            >
                {currentImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
            </button>

            <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="file-input"
            />
        </div>
    );
};

export default ImageUploader;