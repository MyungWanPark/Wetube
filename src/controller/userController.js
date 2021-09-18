import User from "../model/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
  const user = await User.findOne({ username, socialOnly: false });
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

export const startWithGithub = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  res.redirect(finalUrl);
};

export const finishWithGithub = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const githubApi = "https://api.github.com";
    const userData = await (
      await fetch(`${githubApi}/user`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    console.log(userData);
    const emails = await (
      await fetch(`${githubApi}/user/emails`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emails.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });

    if (!user) {
      user = await User.create({
        email: emailObj.email,
        username: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
      req.session.loggedIn = true;
      req.session.user = user;

      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};
export const edit = (req, res) => res.send("welcome User edit!");
export const see = (req, res) => res.send("See profile");
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
