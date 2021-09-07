export const home = (req, res) => {
  const videos = [
    {
      title: "first video",
      views: 30,
      comments: 3,
      like: 1000,
      share: 10,
    },
    {
      title: "second video",
      views: 30,
      comments: 3,
      like: 1000,
      share: 10,
    },
    {
      title: "third video",
      views: 30,
      comments: 3,
      like: 1000,
      share: 10,
    },
  ];
  return res.render("home", { headTitle: "home", videos });
};

export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("search video");
export const upload = (req, res) => res.send("upload video");
export const remove = (req, res) => res.send("remove video");
