const amqp = require('amqplib');

async function sendMessageToQueue(message) {
  try {
    // RabbitMQ 서버에 연결
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();

    // 큐 선언
    const queueName = 'GPT';
    await channel.assertQueue(queueName, { durable: true });

    // 큐에 메시지 전송
    channel.sendToQueue(queueName, Buffer.from(message));

    console.log(`${queueName} 큐에 메시지 전송됨: ${message}`);

    // 연결 닫기
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('RabbitMQ에 메시지 전송 중 오류 발생:', error);
  }
}

module.exports = { sendMessageToQueue };
