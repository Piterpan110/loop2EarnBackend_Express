const { Focus } = require('../database/models');

module.exports = {
  findAllFocus: async () => {
    try {
      const focuses = await Focus.findAll();
      console.log('focuses: ', focuses);
      return focuses;
    } catch (error) {
      console.error('Error fetching focuses:', error);
      throw error;
    }
  },

  updateFocus: async (focus) => {
    const updatedFocus = await Focus.update(
      { title: focus.title, description: focus.description },
      { where: { id: focus.id } }
    );
    console.log('updatedFocus: ', updatedFocus);
    return updatedFocus;
  },

  deleteFocus: async (id) => {
    const deleted = await Focus.destroy({
      where: { id: id }
    });
    return deleted;
  },
  createFocus: async (id, title, description, user, fizz) => {
    const newFocus = await Focus.create(id, title, description, user, fizz);
    return newFocus;
  }
};
