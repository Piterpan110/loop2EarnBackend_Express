const FocusService = require('../service/focus-service');
module.exports = {
  getAll: async (req, res) => {
    try {
      const focuses = await FocusService.findAllFocus();
      return res.status(200).send(focuses);
    } catch (error) {
      throw error;
    }
  },
  Delete: async (req, res) => {
    try {
      console.log('request: ', req.body);
      const focusId = req.body.id;
      if (!focusId) {
        return res.status(400).send({ error: 'ID is required' });
      }
      console.log('which: ', focusId);
      const deleted = await FocusService.deleteFocus(focusId);
      return res.status(200).send({ deleted: deleted });
    } catch (error) {
      throw error;
    }
  },
  Edit: async (req, res) => {
    try {
      console.log('editing request data: ', req.body);
      const parsedBody =
        typeof req.body.body === 'string'
          ? JSON.parse(req.body.body)
          : req.body;
      const { id, title, description } = parsedBody;
      console.log('parsed body: ', parsedBody);
      const focus = {
        id: id,
        title: title,
        description: description
      };
      console.log('focus:-', focus);
      const [result] = await FocusService.updateFocus(focus);
      if (result < 1) {
        return res
          .status(402)
          .send({ message: 'this data is not exist in DB', updated: false });
      }
      return res.status(200).send({ updated: true });
    } catch (ex) {
      throw ex;
    }
  },
  Create: async (req, res) => {
    try {
      console.log('request body: ', req.body);
      const parsedBody = JSON.parse(req.body.body);
      console.log('parsed body: ', parsedBody);
      const { id, title, description, user, fizz } = parsedBody;
      console.log('DATA: ', id, title, description, user, fizz);
      const focus = {
        id: id,
        title: title,
        description: description,
        user: user,
        fizz: fizz
      };
      console.log('focus:', focus);
      const newfocus = await FocusService.createFocus(focus);
      console.log('successfully', newfocus);
      return res.status(200).send({ focus: newfocus, created: true });
    } catch (error) {
      console.log('error');
      throw error;
    }
  }
};
