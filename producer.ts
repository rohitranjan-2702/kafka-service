import { kafka } from "./client";

async function init() {
  const producer = kafka.producer();
  console.log("producer connecting...");
  await producer.connect();
  console.log("producer connection success!");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0,
        key: "location-update",
        value: JSON.stringify({ name: "rohit", location: "blr" }),
      },
    ],
  });
  console.log("msg send success");

  await producer.disconnect();
}

init();
