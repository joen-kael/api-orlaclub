const cuid = require("cuid");
const ActivitiesRepository = require("./repository");
const UploadRepository = require("../upload/repository");

class ActivitiesService {
  static config() {
    return new ActivitiesService(
      ActivitiesRepository.config(),
      UploadRepository.config()
    );
  }

  async list() {
    const activities = await this.activitiesRepository.list();
    const pictures = await this.uploadRepository.list();
    const picturesByActivityId = transformPictures(pictures)
    return activities.map(activity => {
      return {
        ...activity,
        pictures: picturesByActivityId[activity.id]
      }
    })
  }

  async create(activity) {
    return this.activitiesRepository.create({ ...activity, id: cuid() });
  }

  async retrieve(id) {
    const activity = await this.activitiesRepository.retrieve(id);
    if (!activity) throw new Error("Activity not found",);
    const pictures = await this.uploadRepository.listByActivityId(id);
    return {
      ...activity,
      pictures
    }
  }

  async update(id, activity) {
    const res = await this.activitiesRepository.retrieve(id);
    if (!res) throw new Error("Activity not found",);
    const item = {
      ...activity,
      updatedAt: new Date().toISOString(),
    };
    return await this.activitiesRepository.update(id, item);
  }

  async delete(id) {
    const activity = await this.activitiesRepository.retrieve(id);
    if (!activity) throw new Error("Activity not found",);
    return await this.activitiesRepository.delete(id);
  }
  constructor(activitiesRepository, uploadRepository) {
    this.activitiesRepository = activitiesRepository;
    this.uploadRepository = uploadRepository;
  }
}
const transformPictures = (pictures) => {
  return pictures.reduce((result, picture) => {
    const { id, url, activity_id } = picture;

    if (!result[activity_id]) {
      result[activity_id] = [];
    }

    result[activity_id].push({
      id,
      url,
    });

    return result;
  }, {});
}
module.exports = ActivitiesService;