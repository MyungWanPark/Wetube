import User from "../model/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { headTitle: "Join" });
export const postJoin = async (req, res) => {
  const { username, password, password2, name, email, location } = req.body;
  const headTitle = "Join";

  if (password !== password2) {
    return res.status(400).render("join", {
      headTitle,
      errorMessage: "password does not match",
    });
  }

  const Exist = await User.exists({ $or: [{ username }, { email }] });

  if (Exist) {
    return res.status(400).render("join", {
      headTitle,
      errorMessage: "email/username is already taken",
    });
  }
  try {
    await User.create({
      username,
      password,
      name,
      email,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      headTitle: "join",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { headTitle: "login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const headTitle = "login";
  if (!user) {
    return res.status(400).render("login", {
      headTitle,
      errorMessage: "username doesn't exist",
    });
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).render("login", {
      headTitle,
      errorMessage: "password does not match",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};
export const edit = (req, res) => res.send("welcome User edit!");
export const remove = (req, res) => res.send("Lets delete user!");
export const see = (req, res) => res.send("See profile");
export const logout = (req, res) => res.send("Logout");
