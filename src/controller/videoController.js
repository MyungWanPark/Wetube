export const home = (req, res) => res.send("Welcome Home Videos");
export const see = (req, res) => {
  return res.send(`you are watching #${req.params.id}`);
};
export const edit = (req, res) => res.send("edit videos");
export const search = (req, res) => res.send("search video");
export const upload = (req, res) => res.send("upload video");
export const remove = (req, res) => res.send("remove video");
