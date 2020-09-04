const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          email: user.email,
        });
      });
    });
  });
});

router.post("/kakaologin", (req, res) => {
  const data = req.body;
  const {
    profile: {
      id,
      kakao_account: { email, is_email_verified },
      properties: { nickname },
    },
  } = data;
  if (is_email_verified) {
    User.findOne({ email: email + "(kakao)" }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong...",
        });
      } else {
        if (user) {
          //비밀번호 까지 맞다면 토큰을 생성하기.
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            // 토큰을 저장한다.  어디에 ?  쿠키 , 로컬스토리지
            res
              .cookie("w_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          });
        } else {
          let password = id + "kakao";
          let name = nickname;
          let kakao_email = email + "(kakao)";
          const newUser = new User({
            email: kakao_email,
            name,
            password,
          });

          //비밀번호 까지 맞다면 토큰을 생성하기.
          newUser.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            // 토큰을 저장한다.  어디에 ?  쿠키 , 로컬스토리지
            res
              .cookie("w_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          });
        }
      }
    });
  }
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
