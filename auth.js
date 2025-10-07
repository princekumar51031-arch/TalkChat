const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Login
router.post("/login", async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if(!user) return res.json({ success:false, error:"User not found" });
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.json({ success:false, error:"Incorrect password" });
    res.json({ success:true, user });
  } catch(err){
    res.json({ success:false, error:err.message });
  }
});

// Fetch friends (all users except self)
router.get("/friends/:userId", async (req,res)=>{
  const { userId } = req.params;
  const users = await User.findAll({ where: { id: { [Op.ne]: userId } } });
  res.json(users);
});

module.exports = router;
