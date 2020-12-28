let audioElement = document.getElementById("audio");
let recordButton = document.getElementById("record-button");
let stopButton = document.getElementById("stop-button");
let chunks = [];
let recorder = null;

const startRecording = () => {
  recorder.start();
  recordButton.disabled = true;
  stopButton.disabled = false;
  recordButton.style.border = "1px solid red";
};
const stopRecording = () => {
  recorder.stop();
  stopButton.disabled = true;
  recordButton.disabled = false;
  stopButton.style.border = "1px solid gray";
};

const main = async () => {
  // try {
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  recorder = new MediaRecorder(stream);

  recordButton.addEventListener("click", startRecording);

  stopButton.addEventListener("click", stopRecording);

  recorder.ondataavailable = saveCurrentRecording;

  recorder.onstop = sendToMediaPlayer;
  // } catch (loi) {
  //   // console.log("loi ne:", loi.name);
  //   // if (loi.name === "NotAllowedError") {
  //   document.write("Oops, there was some error.");
  //   // }
  // }
};

const saveCurrentRecording = (event) => {
  chunks.push(event.data);
  console.log(chunks);
};

const sendToMediaPlayer = () => {
  const blob = new Blob(chunks, {
    type: "audio/mp4; codecs=opus",
  });
  const url = URL.createObjectURL(blob);
  audioElement.setAttribute("src", url);

  //clear the recorded chunks if preferred
  // chunks = [];
};

main();

/// Charles's code
// const main = async () => {
//   try {
//     let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     console.log(stream);
//     document.write("no error");
//   } catch (error) {
//     if (error.name === "NotAllowedError") {
//       document.write("Oops, we needed permissions");
//     }
//   }
// };

// main();
