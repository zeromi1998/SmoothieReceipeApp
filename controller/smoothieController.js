const Smoothie = require("../model/Smoothie");

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
    const smoothiesData = await Smoothie.find({ "auther.userId": req.user.id });
    res.json(smoothiesData);
  } catch (err) {
    res.status(401).send({ err });
  }
};

module.exports.post_smoothies = async (req, res) => {
  const { name, ingredients, description, auther } = req.body;

  try {
    const smoothie = await Smoothie.create({
      name,
      ingredients,
      description,
      auther,
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
