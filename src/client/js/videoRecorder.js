import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
const actionBtn = document.getElementById("actionBtn");
const preview = document.getElementById("preview");
let stream;
let recorder;
let VideoUrl;

const fileObj = {
  input: "recording.webm",
  output: "recording.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (ObjUrl, fileName) => {
  const a = document.createElement("a");
  a.href = ObjUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/static/ffmpeg-core.js",
  });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", fileObj.input, await fetchFile(VideoUrl));
  await ffmpeg.run("-i", fileObj.input, "-r", "60", fileObj.output);
  await ffmpeg.run(
    "-i",
    fileObj.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    fileObj.thumb
  );

  const MP4File = ffmpeg.FS("readFile", fileObj.output);
  const thumbnailFile = ffmpeg.FS("readFile", fileObj.thumb);

  const MP4Blob = new Blob([MP4File.buffer], { type: "video/mp4" });
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });

  const MP4Url = URL.createObjectURL(MP4Blob);
  const ThumbnailUrl = URL.createObjectURL(thumbnailBlob);

  downloadFile(MP4Url, "my recording.mp4");
  downloadFile(ThumbnailUrl, "thumb.jpg");

  ffmpeg.FS("unlink", fileObj.input);
  ffmpeg.FS("unlink", fileObj.output);
  ffmpeg.FS("unlink", fileObj.thumb);

  URL.revokeObjectURL(MP4Url);
  URL.revokeObjectURL(ThumbnailUrl);
  URL.revokeObjectURL(VideoUrl);

  actionBtn.disabled = false;
  init();
  actionBtn.innerText = "Record video";
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  recorder.stop();
  actionBtn.innerText = "Download recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
};

const handleStart = () => {
  actionBtn.innerText = "Stop recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    VideoUrl = URL.createObjectURL(event.data);
    preview.srcObject = null;
    preview.loop = true;
    preview.src = VideoUrl;
    preview.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: 1024,
      height: 576,
    },
  });
  preview.srcObject = stream;
  preview.play();
};

init();

actionBtn.addEventListener("click", handleStart);
