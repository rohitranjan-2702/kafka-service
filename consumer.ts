import { kafka } from "./client";

async function init() {
  const consumer = kafka.consumer({ groupId: "group-1" });
  console.log("producer connecting...");
  await consumer.connect();
  console.log("producer connection success!");

  await consumer.subscribe({
    topics: ["rider-updates"],
    fromBeginning: true, // get message from beggining
  });
  console.log("msg send success");

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(`[topic: ${topic}] PART: ${partition} MSG: ${message.value}`);
      //   console.log(message);
    },
  });
}

init();
