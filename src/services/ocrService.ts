import { invoke } from '@tauri-apps/api/core';

export const processImage = async (filePath: string): Promise<string> => {
  return await invoke('run_ocr', { path: filePath });
};
