// import React, { useRef, useState } from 'react';
// import '../App.css';

// const cards = [
//     { title: 'संतों संग महाकुंभ पर्व', img: '/images/SANT_DOING_POOJA.jpg' },
//     { title: 'डिजिटल महाकुंभ 2025', img: '/images/BRIDGE.jpg' },
//     { title: 'गंगा की अविरल धार', img: '/images/RIVER.jpg' },
// ];

// const CardGrid = () => {
//   const [showCamera, setShowCamera] = useState(false);
//   const [selectedBanner, setSelectedBanner] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   const openCamera = async (bannerImg) => {
//     setCapturedImage(null);
//     setSelectedBanner(bannerImg);
//     setShowCamera(true);

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();
//     } catch (err) {
//       alert("Camera not accessible.");
//     }
//   };

//   const capturePhoto = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     const background = new Image();
//     background.src = selectedBanner;

//     background.onload = () => {
//       // Draw banner first
//       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//       // Then draw user's face from video (centered smaller size)
//       ctx.drawImage(video, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);

//       const finalImage = canvas.toDataURL('image/png');
//       setCapturedImage(finalImage);

//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }

//       setShowCamera(false);
//     };
//   };

//   const downloadImage = () => {
//     const link = document.createElement('a');
//     link.download = 'mahakumbh-banner-photo.png';
//     link.href = capturedImage;
//     link.click();
//   };

//   return (
//     <div>
//       <div className="card-grid">
//         {cards.map((card, index) => (
//           <div className="card" key={index} onClick={() => openCamera(card.img)}>
//             <img src={card.img} alt={card.title} />
//             <p>{card.title}</p>
//           </div>
//         ))}
//         <button className="start-button">Start</button>
//       </div>

//       {showCamera && (
//         <div className="camera-container">
//           <video ref={videoRef} width="300" height="200" autoPlay muted playsInline />
//           <button className="capture-button" onClick={capturePhoto}>📸 Capture</button>
//         </div>
//       )}

//       {capturedImage && (
//         <div className="preview">
//           <h3>📷 Captured Image with Banner Background</h3>
//           <img src={capturedImage} alt="Final" />
//           <button onClick={downloadImage}>⬇️ Download</button>
//         </div>
//       )}

//       <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>
//     </div>
//   );
// };

// export default CardGrid;


import React, { useRef, useState } from 'react';
import '../App.css';

const cards = [
    { title: 'संतों संग महाकुंभ पर्व', img: '/images/SANT_DOING_POOJA.jpg' },
    { title: 'डिजिटल महाकुंभ 2025', img: '/images/BRIDGE.jpg' },
    { title: 'गंगा की अविरल धार', img: '/images/RIVER.jpg' },
];

const CardGrid = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const openCamera = async (bannerImg) => {
    setCapturedImage(null);
    setSelectedBanner(bannerImg);
    setShowCamera(true);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      alert("Camera not accessible.");
    }
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    // Capture image from video
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Convert the canvas to blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image_file", blob);
      formData.append("size", "auto");
  
      try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          headers: {
            "X-Api-Key": "eSR6tXKEUFLGQ6EWKMZKwvkY", // Your remove.bg API key
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Remove.bg API request failed");
        }
  
        const blobResult = await response.blob();
        const removedBgImg = new Image();
        removedBgImg.src = URL.createObjectURL(blobResult);
  
        removedBgImg.onload = () => {
          const banner = new Image();
          banner.src = selectedBanner;
          banner.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(banner, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
  
            const finalImage = canvas.toDataURL("image/png");
            setCapturedImage(finalImage);
            setShowCamera(false);
  
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
            }
          };
        };
      } catch (err) {
        alert("Failed to remove background: " + err.message);
      }
    }, "image/png");
  };
  
  

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'mahakumbh-banner-photo.png';
    link.href = capturedImage;
    link.click();
  };

  return (
    <div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div className="card" key={index} onClick={() => openCamera(card.img)}>
            <img src={card.img} alt={card.title} />
            <p>{card.title}</p>
          </div>
        ))}
        <button className="start-button">Start</button>
      </div>

      {showCamera && (
        <div className="camera-container">
          <video ref={videoRef} width="300" height="200" autoPlay muted playsInline />
          <button className="capture-button" onClick={capturePhoto}>📸 Capture</button>
        </div>
      )}

      {capturedImage && (
        <div className="preview">
          <h3>📷 Captured Image with Banner Background</h3>
          <img src={capturedImage} alt="Final" />
          <button onClick={downloadImage}>⬇️ Download</button>
        </div>
      )}

      <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CardGrid;


