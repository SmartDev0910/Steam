import axios from "./axios";
const FormData = require('form-data');

export const ListApplicationTypes = async () => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get(`/api/application_types`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const ListApplicationTypeById = async (id) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get(`/api/application_types/${id}`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const Apply = async (memberID, applicationTypeID, audioData) => {
  try {
    const blobData = dataURItoBlob(audioData);

    // Convert the blob to a File object
    const audioFile = new File([blobData], 'recording.wav', { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('applicationTypeId', applicationTypeID);
    formData.append('audio', audioFile);

    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post(`/api/members/${memberID}/apply`, formData, {
			headers: {
				authorization,
        'Content-Type': `multipart/form-data`
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

// Helper function to convert base64 encoded string to blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}