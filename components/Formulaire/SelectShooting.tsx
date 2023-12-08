'use client'
import { useEffect,useState } from "react";
import Image from "next/image";
import { ShootingData } from "@/types/types";

export default function SelectShooting() {
    const [images, setImages] = useState<ShootingData[]>([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    console.log(images)
    console.log(selectedImages)
    console.log(showModal)
    console.log(currentImage)
    
    useEffect(() => {
        fetch('/api/GetShooting')
            .then(response => response.json())
            .then(data => {
                const updatedData: ShootingData[] = data.shootings.map((shooting: ShootingData) => ({
                    ...shooting,
                    imagePath: shooting.imagePath.map((path: string) => 
                        // `http://localhost:3000${path.replace('./public', '')}`
                        `${path.replace('./public', '')}`
                    )
                }));
                setImages(updatedData);
            })
            .catch(error => console.error('Erreur lors de la récupération des images:', error));
    }, []);

    
    const nextImage = () => {
        if (currentImage) {
            const allImages = images.flatMap(shooting => shooting.imagePath);
            const currentIndex = allImages.findIndex(image => image === currentImage);
            const nextIndex = (currentIndex + 1) % allImages.length;
            setCurrentImage(allImages[nextIndex]);
        }
    };
    
    const prevImage = () => {
        if (currentImage) {
            const allImages = images.flatMap(shooting => shooting.imagePath);
            const currentIndex = allImages.findIndex(image => image === currentImage);
            const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            setCurrentImage(allImages[prevIndex]);
        }
    };
    
    const handleImageSelect = (imagePath: string) => {
        if (selectedImages.includes(imagePath)) {
            setSelectedImages(selectedImages.filter(image => image !== imagePath));
        } else {
            setSelectedImages([...selectedImages, imagePath]);
        }
    };

    const openModal = (imagePath: string) => {
        setCurrentImage(imagePath);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentImage(null);
    };

    return (
        <div>
            <p>Images sélectionnées : {selectedImages.length}</p>
            {images.map((shooting, index) => (
                <div key={index}>
                    {shooting.imagePath.map((path, idx) => (
                        <div key={idx} onClick={() => openModal(path)}>
                            <Image
                                src={path}
                                alt={`Image ${idx}`}
                                width="200"
                                height="200"
                                style={{ cursor: 'pointer', border: selectedImages.includes(path) ? '2px solid blue' : 'none' }}
                            />
                            <input type="checkbox" checked={selectedImages.includes(path)} onChange={() => handleImageSelect(path)} />
                        </div>
                    ))}
                </div>
            ))}
            {showModal && currentImage && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <Image src={currentImage} alt="Current Image" width="500" height="500" />
                    <span className="prev" onClick={prevImage}>&lt;</span>
                    <span className="next" onClick={nextImage}>&gt;</span>
                </div>
            )}
        </div>
    );
}

