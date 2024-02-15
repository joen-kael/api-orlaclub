const express = require("express");
const router = express.Router();
const multer = require('multer');
const ActivitiesService = require("../../../../modules/activities/service");
const { createActivitySchema, updateActivitySchema } = require("./schema");
const UploadService = require("../../../../modules/upload/service");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });


router.get("/", async (req, res) => {
  const activities = await ActivitiesService.config().list();
  res.status(200).json(activities);
});

router.post("/", async (req, res) => {
  const { body: activity } = req;
  try {
    await createActivitySchema.validate(activity, { abortEarly: false });
    try {
      await ActivitiesService.config().create(activity);
      res.status(200).send("Activity created successfully");
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
    const activity = await ActivitiesService.config().retrieve(id);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await updateActivitySchema.validate(req.body, { abortEarly: false });
    try {
      await ActivitiesService.config().update(id, body);
      res.status(200).json({
        success: true,
        message: "Activity updated successfully",
      });
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
    await ActivitiesService.config().delete(id);
    res
      .status(204)
      .json({ success: true, message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/pictures/:id/upload', uploadMiddleware.single('file'), async (req, res) => {
  const file = req.file;
  const { id } = req.params;

  try {
    const result = await UploadService.config().uploadFile(id, file);
    res.status(200).json({url: result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/pictures/:id/remove', async (req, res) => {
  const { id } = req.params;

  try {
    await UploadService.config().deleteFile(id);
    res
      .status(204)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
