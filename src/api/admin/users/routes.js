const express = require("express");
const { createUserSchema, updateUserSchema } = require("./schema");
const UsersService = require("../../../../modules/users/service");

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await UsersService.config().list();
    res.status(200).json(users);
});

router.post("/", async (req, res) => {
  const { body: user } = req;
  try {
    await createUserSchema.validate(user, { abortEarly: false });
    try {
      await UsersService.config().create(user);
      res.status(200).send("User created successfully");
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.errors });
  }

});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UsersService.config().retrieve(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await updateUserSchema.validate(req.body, { abortEarly: false });
    try {
      await UsersService.config().update(id, body);
      res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.errors });
  }


});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UsersService.config().delete(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

});

module.exports = router;
