import { useState, useRef } from "react";

const AudioUpload = ({ onAudioLoad, currentAudioUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      setError("Please select a valid audio file");
      return;
    }

    // Validate file size (limit to 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError("File size must be less than 50MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Create object URL for the uploaded file
    const audioUrl = URL.createObjectURL(file);
    onAudioLoad(audioUrl, file.name);
    setIsUploading(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearAudio = () => {
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
    }
    onAudioLoad(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.8)",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        minWidth: "300px",
      }}
    >
      <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>Audio Upload</h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          style={{
            padding: "10px 15px",
            backgroundColor: isUploading ? "#666" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isUploading ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
        >
          {isUploading ? "Uploading..." : "Upload Audio"}
        </button>

        {currentAudioUrl && (
          <button
            onClick={clearAudio}
            style={{
              padding: "10px 15px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            color: "#ff6b6b",
            fontSize: "12px",
            marginTop: "10px",
            padding: "5px",
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            borderRadius: "3px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ fontSize: "12px", marginTop: "10px", opacity: 0.7 }}>
        <div>Supported formats: MP3, WAV, OGG, M4A</div>
        <div>Max file size: 50MB</div>
        {currentAudioUrl && (
          <div>Current: {currentAudioUrl.split("/").pop()}</div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
