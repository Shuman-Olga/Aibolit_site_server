const db = require('../models'),
  Message = db.Message,
  nodemailer = require('nodemailer'),
  Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Введите имя',
    });
    return;
  }
  if (!req.body.phone) {
    res.status(400).send({
      message: 'Введите номер телефона',
    });
    return;
  }
  if (!req.body.address) {
    res.status(400).send({
      message: 'Введите адрес',
    });
    return;
  }
  if (req.body.consent === false) {
    res.status(400).send({
      message: 'Необходимо согласие на обработку данных',
    });
    return;
  }

  Message.create(req.body)
    .then((message) => {
      res.send({ message: 'Вызов отправлен' });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Ошибка',
      });
    });
  const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AIBOLIT_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Ready to Send');
    }
  });
  const mail = {
    from: req.body.name,
    to: process.env.AIBOLIT_EMAIL,
    subject: '[Айболит] Обратный звонок-кто-то заполнил форму',
    html: `<p>${req.body.name} заполнил(а) форму: Обратный звонок
      на сайте Айболит</p>
              <h4>Подробности</h4>
              <p>Имя: ${req.body.name}</p>
              <p>Телефон:  ${req.body.phone}</p>
              <p>Адрес:  ${req.body.phone}</p>
              <p>Врач:  ${req.body.doctor}</p>
              <p>Сообщение: ${req.body.description}</p>
              <p>Чекбокс: ✓ Отмечено</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent');
    }
  });
};

exports.findAll = (req, res) => {
  Message.findAll({
    order: ['name'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Ошибка',
      });
    });
};
