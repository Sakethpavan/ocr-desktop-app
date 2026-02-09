import { useState, useEffect } from "react";
import { invoke, convertFileSrc } from "@tauri-apps/api/core";
import { getCurrentWebview } from "@tauri-apps/api/webview";

function App() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for OS drag-and-drop events
    const unlisten = getCurrentWebview().onDragDropEvent((event) => {
      if (event.payload.type === "drop") {
        const filePath = event.payload.paths[0];
        handleOcr(filePath);
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const handleOcr = async (path: string) => {
    setLoading(true);
    // 1. Convert local path to a URL React can display
    setImgUrl(convertFileSrc(path));
    
    try {
      // 2. Call our Rust function 'run_ocr' defined in main.rs
      const result: string = await invoke("run_ocr", { path });
      setText(result);
    } catch (err) {
      setText("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#333", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Ubuntu OCR Tool</h2>
      
      <div style={{ 
        border: "3px dashed #ccc", 
        borderRadius: "12px",
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#fcfcfc",
        marginBottom: "1rem"
      }}>
        {imgUrl ? (
          <img src={imgUrl} alt="Preview" style={{ maxHeight: "250px", borderRadius: "8px" }} />
        ) : (
          <p style={{ color: "#888" }}>Drag an image here to extract text</p>
        )}
      </div>

      {loading && <p style={{ textAlign: "center", color: "#646cff" }}>⚙️ Processing with Tesseract...</p>}

      <textarea
        value={text}
        placeholder="Extracted text will appear here..."
        readOnly
        style={{
          width: "100%",
          height: "200px",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "1rem"
        }}
      />
    </div>
  );
}

export default App;
