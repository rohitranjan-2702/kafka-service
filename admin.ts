import { kafka } from "./client";

async function init() {
  const admin = kafka.admin();
  console.log("admin connecting...");
  await admin.connect();
  console.log("admin connection success!");

  console.log("creating topic [rider-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("topic creation success");

  await admin.disconnect();
}

init();
