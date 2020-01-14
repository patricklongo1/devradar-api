/* eslint-disable no-undef */
import Dev from '../models/Dev';
import api from '../services/api';

import parseStringAsArray from '../utils/parseStringAsArray';

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await api.get(`/users/${github_username}`);

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    res.json(dev);
  }
}

export default new DevController();
