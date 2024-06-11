import express from "express";
import { kafka } from "./client";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser());
const port = 8003;

app.get("/", (req, res) => {
  res.send("consumer service live!");
});

app.post("/subscribe", async (req, res) => {
  try {
    const { topic, groupId } = req.body;

    const consumer = kafka.consumer({ groupId });

    console.log("consumer connecting...");
    await consumer.connect();
    console.log("consumer connection success!");

    await consumer.subscribe({
      topics: topic,
      fromBeginning: true, // get message from beggining
    });
    console.log("msg send success");

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log(
          `[topic: ${topic}] PART: ${partition} MSG: ${message.value}`
        );
        //   console.log(message);
      },
    });

    res.status(200).json({
      topic,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.listen(port, () => {
  console.log("The application is listening on port", port);
});
