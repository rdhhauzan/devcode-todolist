const { activity, todo } = require("../models");

class Controller {
  // ! Activity Controller
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

  static async getDetailActivity(req, res) {
    try {
      let getData = await activity.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!getData) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).send({
        status: "Success",
        message: "Success",
        data: getData,
      });
    } catch (error) {
      console.log(error);
      if (error.name == "DATA_NOT_FOUND") {
        res.status(404).send({
          status: "Not Found",
          message: `Activity with ID ${req.params.id} Not Found`,
          data: {},
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }

  static async updateActivity(req, res) {
    const { title } = req.body;
    try {
      let findData = await activity.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }

      await activity.update({ title }, { where: { id: req.params.id } });

      let updatedData = await activity.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Success",
        data: updatedData,
      });
    } catch (error) {
      console.log(error);
      if (error.name == "DATA_NOT_FOUND") {
        res.status(404).send({
          status: "Not Found",
          message: `Activity with ID ${req.params.id} Not Found`,
          data: {},
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }

  static async deleteActivity(req, res) {
    try {
      let findData = await activity.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }

      await activity.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    } catch (error) {
      console.log(error);
      if (error.name == "DATA_NOT_FOUND") {
        res.status(404).send({
          status: "Not Found",
          message: `Activity with ID ${req.params.id} Not Found`,
          data: {},
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }

  // ! Todo Controller
  static async createTodo(req, res) {
    const { title, activity_group_id, is_active } = req.body;
    try {
      if ((!title, !activity_group_id)) {
        throw { name: "FIELD_UNCOMPLETE" };
      }
      const data = await todo.create({
        title,
        activity_group_id,
        priority: "very-high",
        is_active: "true",
      });

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

  static async getAllTodos(req, res) {
    const { activity_group_id } = req.query;
    try {
      const where = activity_group_id
        ? { activity_group_id: activity_group_id }
        : null;

      const getData = await todo.findAll({
        where: where,
      });
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

  static async getDetailTodo(req, res) {
    try {
      let getData = await todo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!getData) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).send({
        status: "Success",
        message: "Success",
        data: getData,
      });
    } catch (error) {
      console.log(error);
      if (error.name == "DATA_NOT_FOUND") {
        res.status(404).send({
          status: "Not Found",
          message: `Todo with ID ${req.params.id} Not Found`,
          data: {},
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }

  static async updateTodo(req, res) {
    const { title, priority, is_active } = req.body;
    try {
      let findData = await todo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }

      await todo.update(
        { title, priority, is_active },
        { where: { id: req.params.id } }
      );

      let updatedData = await todo.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Success",
        data: updatedData,
      });
    } catch (error) {
      console.log(error);
      if (error.name == "DATA_NOT_FOUND") {
        res.status(404).send({
          status: "Not Found",
          message: `Todo with ID ${req.params.id} Not Found`,
          data: {},
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }

  static async deleteTodo(req, res) {
    try {
      let findData = await todo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }

      await todo.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    } catch (error) {
      console.log(error);
      if (error.name == "DATA_NOT_FOUND") {
        res.status(404).send({
          status: "Not Found",
          message: `Todo with ID ${req.params.id} Not Found`,
          data: {},
        });
      } else {
        res.status(500).send({
          status: res.statusCode,
          message: error.message,
        });
      }
    }
  }
}

module.exports = Controller;
