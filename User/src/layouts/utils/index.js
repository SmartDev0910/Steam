export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let formattedMinutes = ("0" + minutes).slice(-2);
  let formattedSeconds = ("0" + (seconds - minutes * 60)).slice(-2);

  return `${formattedMinutes}:${formattedSeconds}`;
}
