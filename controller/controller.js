const { activity, todo } = require("../models");

class Controller {
  static async createActivity(req, res) {
    const { email, title } = req.body;
    try {
      if (!email || !title) {
        throw { name: "FIELD_UNCOMPLETE" };
      }
      const data = await activity.create({ email, title });
      res.status(201).send({
        status: "Success",
        message: "Success",
        data,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "FIELD_UNCOMPLETE") {
        res.status(401).send({
          status: res.statusCode,
          message: "Please Fill all the fields!",
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }

  static async getAllActivities(req, res) {
    try {
      const getData = await activity.findAll();

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: getData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: res.statusCode,
        message: error.message,
      });
    }
  }
}

module.exports = Controller;
