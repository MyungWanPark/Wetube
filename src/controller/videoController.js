let videos = [
  {
    title: "first video",
    views: 30,
    comments: 3,
    like: 1000,
    share: 10,
    id: 1,
  },
  {
    title: "second video",
    views: 30,
    comments: 3,
    like: 1000,
    share: 10,
    id: 2,
  },
  {
    title: "third video",
    views: 30,
    comments: 3,
    like: 1000,
    share: 10,
    id: 3,
  },
];

export const home = (req, res) => {
  return res.render("home", { headTitle: "home", videos });
};
export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { headTitle: `watch ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { headTitle: `editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const video = videos[id - 1];
  video.title = title;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { headTitle: "upload video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    views: 300,
    comments: 3,
    like: 1000,
    share: 10,
    id: videos.length + 1,
  };

  videos.push(newVideo);
  return res.redirect("/");
};
