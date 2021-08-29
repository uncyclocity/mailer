import connectDB from "../mongodb";
import Setting from "../models/settings";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      var post = await Setting.findOne({ [req.body.key]: req.body.value });
      post = req.body;
      var postupdated = await post.save();
      return res.status(200).send(postupdated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send("data_incomplete");
  }
};

export default connectDB(handler);
