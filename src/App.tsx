import { useState, useRef } from "react";

import { FaCheckCircle } from "react-icons/fa";

import "./App.css";

function App() {
  const [image, setImage] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const imageRef = useRef<any>(null);

  const dragOver = (e: any) => {
    e.preventDefault();
    const dragDropContainer: any = document.getElementById(
      "drag-drop-container"
    );
    dragDropContainer.classList.add("dragging");
    console.log("drag over");
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
    const dragDropContainer: any = document.getElementById(
      "drag-drop-container"
    );
    dragDropContainer.classList.add("dragging");
    console.log("drag enter");
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
    const dragDropContainer: any = document.getElementById(
      "drag-drop-container"
    );
    dragDropContainer.classList.remove("dragging");
    console.log("drag leave");
  };

  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const dragDropContainer: any = document.getElementById(
      "drag-drop-container"
    );
    dragDropContainer.classList.remove("dragging");
    // check that the file is an image

    uploadFile(files);
  };

  const uploadFile = (files: any) => {
    if (files[0].type.split("/")[0] !== "image") {
      alert("File is not an image");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();

    formData.append("file", files[0]);

    fetch("https://image-uploader-dev-challenges.glitch.me/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
        setIsUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setImage("");
        setIsUploading(false);
      });

    console.log(formData);
  };

  const copy = (text: string, e: any) => {
    // clipboard api
    navigator.clipboard.writeText(text);
    e.target.innerText = "Copied!";
    e.target.classList.add("copied");
    setTimeout(() => {
      e.target.innerText = "Copy Link";
      e.target.classList.remove("copied");
    }, 3000);
  };

  // get the image url
  const getImageUrl = () => {
    if (imageRef.current.files[0].type.split("/")[0] !== "image") {
      alert("File is not an image");
      return;
    }
    console.log(imageRef.current.files[0]);
    uploadFile(imageRef.current?.files);
  };

  return (
    <div className="App">
      {!isUploading ? (
        image === "" ? (
          <div className="image-uploader-container">
            <span className="title">Upload your image</span>
            <span className="sub-title">File should be Jpeg, Png,...</span>
            <div
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              id="drag-drop-container"
              className="drag-drop-container"
            >
              <img
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                src="src/assets/image.svg"
                className="logo"
                alt="logo"
              />
              <span
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                className="drag-drop-text"
              >
                Drag & Drop your image here
              </span>
            </div>
            <span className="or">Or</span>
            <input
              hidden
              onChange={getImageUrl}
              type="file"
              accept="image/png, image/jpeg"
              ref={imageRef}
              alt=""
            />
            <button
              onClick={() => {
                imageRef.current?.click();
              }}
              className="choose-file-btn"
            >
              Choose a file
            </button>
          </div>
        ) : (
          <div className="uploaded-image-preview">
            <div className="uploaded-image-header">
              <FaCheckCircle className="check-icon" />
              <span className="uploaded-title">Uploaded Successfully!</span>
            </div>
            <img src={image} className="uploaded-image" alt="uploaded" />
            <div className="uploaded-link">
              <span className="uploaded-link-text">{image}</span>
              <button
                onClick={(e) => {
                  copy(image, e);
                }}
                className="copy-btn"
              >
                Copy Link
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="uploading">
          <span className="uploading-title">Uploading...</span>
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
}

export default App;
