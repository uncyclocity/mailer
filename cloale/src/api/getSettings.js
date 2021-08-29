import connectDB from "../mongodb";
import Setting from "../models/settings";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      return await Setting.find().then((data) => {
        return res.status(200).send(data);
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
