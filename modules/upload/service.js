const { put, del } = require("@vercel/blob");
const config = require("../../config");
const ActivitiesService = require("../activities/service");
const UploadRepository = require("./repository");

class UploadService {
  static config() {
    return new UploadService(
      ActivitiesService.config(),
      UploadRepository.config(),
      );
  }

  async uploadFile(id, file) {
    const activity = await this.activitiesService.retrieve(id);
    if (!activity) throw new Error("Activity not found");

    if (!file) throw new Error("File not found");

    const {buffer} = file;
    const originalname = file.originalname;
    const transformName = `activity_${id}-${Date.now()}-${originalname}`;
    
    try {
      const { url } = await put(originalname, buffer, { token: config.tokenVercelBlob, access: 'public' });
      await this.uploadRepository.create({id: transformName, url: url, activity_id: id});
      return url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    } 
  }

  async deleteFile(id) {
    const picture = await this.uploadRepository.retrieve(id);
    if (!picture) throw new Error("Picture not found");

    try {
      await del(picture.url, { token: config.tokenVercelBlob });
      console.log("Arquivo deletado com sucesso do server Vercel!");
      await this.uploadRepository.delete(id);
      console.log("Arquivo deletado do banco de dados!");
    } catch (error) {
      console.error("Erro ao deletar arquivo do server:", error);
    }
  }

  constructor(activitiesService, uploadRepository) {
    this.activitiesService = activitiesService;
    this.uploadRepository = uploadRepository;
  }
}

module.exports = UploadService;
