/* eslint-disable no-undef */
import api from 'axios-https-proxy-fix';
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';
// import api from '../services/api';

const proxy = {
  host: 'proxylatam.indra.es',
  port: 8080,
  auth: {
    username: 'plongo',
    password: 'Pkl180894',
  },
};

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    res.json(devs);
  }

  async store(req, res) {
    try {
      const { github_username, techs, latitude, longitude } = req.body;

      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const response = await api.get(
          `https://api.github.com/users/${github_username}`,
          { proxy }
        );

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
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DevController();
