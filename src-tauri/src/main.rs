use tesseract::Tesseract;
use tauri::command;

#[command]
async fn run_ocr(path: String) -> Result<String, String> {
    // Initialize tesseract with English
    let mut tess = Tesseract::new(None, Some("eng"))
        .map_err(|e| format!("Tesseract Init Error: {}", e))?;

    // Load image and process
    tess = tess.set_image(&path)
        .map_err(|e| format!("Image Load Error: {}", e))?;

    let text = tess.get_text()
        .map_err(|e| format!("Extraction Error: {}", e))?;

    Ok(text)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_ocr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
