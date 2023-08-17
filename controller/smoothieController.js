const Smoothie = require("../model/Smoothie");

const smoothieImgS = require("../model/smoothieImg");

module.exports.get_smoothies = async (req, res) => {
  try {
    uId = req.user.id;
    const smoothiesData = await Smoothie.find();
    res.json(smoothiesData);
  } catch (err) {
    res.status(401).send({ err });
  }
};

module.exports.get_smoothie = async (req, res) => {
  try {
    uId = req.user.id;
    const smoothiesData = await Smoothie.find({ "author.userId": req.user.id });
    res.json(smoothiesData);
  } catch (err) {
    res.status(401).send({ err });
  }
};

module.exports.upload_smoothiesImg = async (req, res) => {
  const { smoothieImg } = req.body;
  const url = req.protocol + "://" + req.get("host");
  console.log("this is ingr*************", url, req.file);

  try {
    const smoothieImage = await smoothieImgS.create({
      smoothieImg: url + "/public/" + req.file.filename,
    });

    console.log("this is neew Reposne from Image Database ", smoothieImage);
    if (smoothieImage) {
      res.status(200).send(smoothieImage);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports.post_smoothies = async (req, res) => {
  const { smoothieImg, name, ingredients, description, author } = req.body;
  // console.log("this is ingr*************", url, req.body);

  try {
    const smoothie = await Smoothie.create({
      smoothieImg,
      name,
      ingredients,
      description,
      author,
    });
    if (smoothie) {
      res.status(200).send(smoothie);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports.edit_smoothie = async (req, res, next) => {
  try {
    const smoothieData = await Smoothie.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(smoothieData);
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports.delete_smoothie = async (req, res, next) => {
  try {
    const deletedData = await Smoothie.remove({ _id: req.params.id });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(400).send({ err });
  }
};
