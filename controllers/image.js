const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "eca5271dac4945308709f3dcd0d3efb2",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImagePut = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to connect"));
};

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall: handleApiCall,
};
