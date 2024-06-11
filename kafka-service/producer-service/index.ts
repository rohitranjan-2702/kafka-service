import express from "express";
import { kafka } from "./client";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser());
const producer = kafka.producer();
const port = 8002;

app.get("/", (req, res) => {
  res.send("producer service live!");
});

export type IMessage = {
  partition: number;
  key: string;
  value: any;
};

app.post("/produce", async (req, res) => {
  try {
    console.log(req.body);
    const { topic, message }: { topic: string; message: IMessage } = req.body;

    console.log("producer connecting...");
    await producer.connect();
    console.log("producer connection success!");

    await producer.send({
      topic: topic,
      messages: [
        {
          partition: message.partition,
          key: message.key,
          value: JSON.stringify(message.value),
        },
      ],
    });
    console.log("msg send success");

    await producer.disconnect();

    return res.status(200).json({
      topic,
      data: message,
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
