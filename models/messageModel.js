module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    doctor: Sequelize.STRING,
    description: Sequelize.TEXT,
    consent: Sequelize.BOOLEAN,
  });
  return Message;
};
