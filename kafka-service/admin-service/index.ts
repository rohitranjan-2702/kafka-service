import express from "express";
import { kafka } from "./client";

const app = express();
const admin = kafka.admin();
const port = 8001;

app.get("/", (req, res) => {
  res.send("admin service live!");
});

app.post("/createTopic", async (req, res) => {
  try {
    const { topic, numPartitions } = req.body;
    console.log("admin connecting...");
    await admin.connect();
    console.log("admin connection success!");

    console.log("creating topic [rider-updates]");
    await admin.createTopics({
      topics: [
        {
          topic,
          numPartitions,
        },
      ],
    });
    console.log("topic creation success");

    await admin.disconnect();

    return res.status(200).json({
      topic,
      numPartitions,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.listen(port, () => {
  console.log("The application is listening on port", port);
});
