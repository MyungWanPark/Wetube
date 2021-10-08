const { async } = require("regenerator-runtime");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteSpan = document.querySelectorAll(".deleteSpan");
const video__comments = document.querySelector(".video__comments");

const deleteComment = (commentId) => {
  const selectedList = document.querySelector(
    `li.video__comment[data-id='${commentId}']`
  );
  selectedList.remove();
};

const addComment = (text, id) => {
  const unorderList = document.querySelector(".video__comments ul");
  const li = document.createElement("li");
  li.className = "video__comment";
  li.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  li.appendChild(icon);
  li.appendChild(span);
  li.appendChild(span2);
  unorderList.prepend(li);
  span2.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const { id } = videoContainer.dataset;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { commentId } = await response.json();
    addComment(text, commentId);
  }
};

const handleDelete = async (event) => {
  const commentId = event.path[1].dataset.id;
  const response = await fetch(`/api/${commentId}/commentDelete`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    console.log("yah DeleteComplete");
    deleteComment(commentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteSpan) {
  for (const cancelSpan of deleteSpan) {
    cancelSpan.addEventListener("click", handleDelete);
  }
}
