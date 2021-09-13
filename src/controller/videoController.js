import Video from "../model/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { headTitle: "home", videos });
  } catch {}
};
export const see = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("watch", { headTitle: video.title, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { headTitle: `editing` });
};

export const postEdit = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { headTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      headTitle: "upload video",
      errorMessage: error._message,
    });
  }
};
