export async function covertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64string = reader.result?.toString().split(",")[1];
      if (base64string) {
        resolve(base64string);
      } else {
        reject("Failed to convert file to base64");
      }
    };

    reader.onerror = () => {
      reject("Failed to read file");
    };

    reader.readAsDataURL(file);
  });
}
