const express = require("express")
const router = express.Router()
const users = require("../models/users")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();

async function getUser(req, res, next) {
  let user;
  try {
    user = await users.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({message: "cannot find user"})
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  res.user = user
  next()
}

router.get("/gender/:gender_interest", async (req, res) => {
  try {
    const { gender_interest } = req.params;
    let query = {};

    if (gender_interest === "everyone") {
      query = {
        $or: [
          { gender: { $in: ["man", "woman"] }, gender_interest: "everyone" },
          { gender_interest: { $in: ["man", "woman"] }, gender: "everyone" },
          { gender: "man", gender_interest: "woman" },
          { gender: "woman", gender_interest: "man" },
        ],
      };
    } else {
      query = {
        $or: [
          { gender: gender_interest, gender_interest: "everyone" },
          { gender: "everyone", gender_interest: gender_interest },
          {
            gender: gender_interest,
            gender_interest: { $in: ["everyone", gender_interest] },
          },
        ],
      };
    }

    const filteredUsers = await users.find(query).select("_id first_name img_url gender gender_interest");
    res.json({ filteredUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try{
    const usersData = await users.find()
    res.json(usersData)
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

router.get("/:id", getUser, async (req, res) => {
  const { _id, img_url, first_name, matches } = res.user;
  res.json({ _id, img_url, first_name, matches });
})

router.put("/match/:_id", async (req, res) => {
  const currentUserId = req.params._id;
  const { matchedId } = req.body;

  try {
    const queryUser = { _id: currentUserId };
    const updateUser = { $addToSet: { matches: matchedId } };
    const user = await users.findOneAndUpdate(queryUser, updateUser, { new: true });

    const queryOtherUser = { _id: matchedId };
    const updateOtherUser = { $addToSet: { matches: currentUserId } };
    const otherUser = await users.findOneAndUpdate(queryOtherUser, updateOtherUser, { new: true });

    if (!user || !otherUser) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      user: {
        _id: user._id,
        img_url: user.img_url,
        gender_interest: user.gender_interest,
        matches: user.matches,
      },
      otherUser: {
        _id: otherUser._id,
        img_url: otherUser.img_url,
        gender_interest: otherUser.gender_interest,
        matches: otherUser.matches,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getUser, async (req, res) => {
  const userUpdates = [
    "first_name",
    "birthday",
    "birthmonth",
    "birthyear",
    "gender",
    "gender_interest",
    "about",
    "matches",
    "img_url"
  ];

  userUpdates.forEach((field) => {
    if (req.body[field] != null) {
      res.user[field] = req.body[field];
    }
  });

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const existingUser = await users.findOne({email: req.body.email});

    if (existingUser) {
      return res.status(400).json({message: "user already exists"});
    }
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({message: "Encryption failed"});
      }
      const user = new users({
        email: req.body.email,
        hashed_password: hash
      });
      const newUser = await user.save();
      res.status(201).json({ message: "Logged in successfully", userID: newUser._id});
    });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await users.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    bcrypt.compare(req.body.password, user.hashed_password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Authentication failed" });
      }
      
      if (result) {
        res.status(200).json({
          message: "Logged in successfully",
          _id: user._id,
          img_url: user.img_url,
          gender_interest: user.gender_interest,
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router