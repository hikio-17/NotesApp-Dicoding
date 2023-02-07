const amqpl = require('amqplib');

const ProducerService = {
  sendMessage: async (queue, message) => {
    const connection = await amqpl.connect(process.env.RABBITMQ_SERVER);
    const chanel = await connection.createChannel();

    await chanel.assertQueue(queue, {
      durable: true,
    });

    await chanel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;
