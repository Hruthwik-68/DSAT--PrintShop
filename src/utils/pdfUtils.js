import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import * as pdfjsLib from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const getPdfPageCount = async (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        resolve(pdf.numPages);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};
