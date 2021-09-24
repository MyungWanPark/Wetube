import User from "../model/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import session from "express-session";
import Video from "../model/Video";

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
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log("It comes to last");
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
export const getEdit = (req, res) => {
  return res.render("edit-profile", { headTitle: "edit-profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatar_url },
    },
    body: { email, username, name, location },
    file,
  } = req;

  let changedEmail = null;
  let changedUsername = null;

  if (req.session.user.email !== email) {
    changedEmail = email;
  }
  if (req.session.user.username !== username) {
    changedUsername = username;
  }
  if (changedEmail || changedUsername) {
    const foundUser = await User.findOne({
      $or: [{ username: changedUsername }, { email: changedEmail }],
    });
    console.log("foundUser = ", foundUser);
    if (foundUser) {
      return res.status(400).render("edit-profile", {
        headTitle: "Edit profile",
        errorMessage: "username or email is already taken",
      });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatar_url: file ? file.path : avatar_url,
      email,
      username,
      name,
      location,
    },
    { new: true }
  );

  req.session.user = updatedUser;

  return res.redirect("/user/edit");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  console.log("user :", user);
  if (!user) {
    return res.status(404).render("404", { headTitle: "can't find user" });
  }

  return res.render("user/profile", {
    headTitle: user.name,
    user,
  });
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly) {
    return res.redirect("/");
  }
  return res.render("user/change-password", { headTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, password, password2 },
  } = req;

  const user = await User.findById(_id);

  if (password !== password2) {
    return res.status(400).render("user/change-password", {
      headTitle: "Change Password",
      errorMessage: "password doesn't match with confirmation password",
    });
  }

  const passwordCompare = await bcrypt.compare(oldPassword, user.password);

  if (!passwordCompare) {
    return res.status(400).render("user/change-password", {
      headTitle: "Change Password",
      errorMessage: "password doesn't match with confirmation password",
    });
  }

  user.password = password;
  await user.save();

  return res.redirect("/user/logout");
};
