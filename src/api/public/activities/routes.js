const express = require('express');
const ActivitiesService = require('../../../../modules/activities/service');

const router = express.Router();

router.get('/', async (req, res) => {
    const activities = await ActivitiesService.config().list();
    res.status(200).json(activities)
})

module.exports = router