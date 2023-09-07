const express = require("express")
const router = express.Router()
const messages = require("../models/messages")

router.post("/", async (req, res) => {
  const newMessage = new messages(req.body)
  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get("/:conversationId", async (req, res) => {
  try {
    const messagesData = await messages.find({
      conversation_id: req.params.conversationId
    })
    res.status(200).json(messagesData)
  } catch (error) {
    res.status(500).json(error)
  }
})
  

module.exports = router;