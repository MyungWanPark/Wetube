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
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("search video");
export const upload = (req, res) => res.send("upload video");
export const remove = (req, res) => res.send("remove video");
