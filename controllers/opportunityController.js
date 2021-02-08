const opportunityController = require("express").Router();
const { opportunityValidation } = require("../functions/validation");
const Opportunity = require("../models/Opportunity");
const fetch = require("node-fetch");
const verify = require("../middleware/verfiyToken");

// @route GET api/opportunity
// @dessc Get Specific Opportunity or All Opportunities
// @access PUBLIC

//TODO: Implement Pagination
opportunityController.get("/", async (req, res) => {
  console.log("Someone is trying to get data");
  const { c } = req.query;
  if (c) {
    try {
      const specificOpportunity = await Opportunity.find({ classification: c });
      res.status(200).send(specificOpportunity);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      const opportunityAll = await Opportunity.find();
      res.status(200).send(opportunityAll);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

// @route DELETE api/opportunity
// @dessc Delete Opportunity
// @access AUTH
opportunityController.delete("/:id", verify, async (req, res) => {
  try {
    const opportunity = await Opportunity.deleteOne({ _id: req.params.id });
    res.status(200).send("Opportunity deleted.");
  } catch (err) {
    res.status(400).send("Couldn't delete opportunity");
  }
});

// @route UPDATE api/opportunity
// @dessc UPDATE Opportunity
// @access AUTH
opportunityController.patch("/:id", verify, async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(opportunity);
  } catch (error) {
    res.status(400).send(error);
  }
});

// @route POST api/opportunity
// @dessc Create Opportunity
// @access PUBLIC
opportunityController.post("/", verify, async (req, res) => {
  const urlSplit = req.body.url.split(" ");
  req.body.url = urlSplit[0];

  //Making sure that we are getting valid data
  const { error } = opportunityValidation(req.body);
  if (error) return res.status(400).json(error);

  //Making sure we don't have dupicates
  const urlExists = await Opportunity.findOne({ url: req.body.url });
  if (urlExists) return res.status(400).json("Opportunity already exists");

  //Making sure url that was sent is real
  try {
    const urlResponse = await fetch(req.body.url);
    if (urlResponse.status != 200) {
      console.log("URL WAS NOT FOUND");
      return res.status(404).json("URL was not found");
    }
    const opportunity = new Opportunity({
      name: req.body.name,
      url: req.body.url,
      participants: req.body.participants,
      classification: req.body.classification,
      major: req.body.major,
      deadline: req.body.deadline,
    });
    const savedOpportunity = await opportunity.save();
    res.status(200).json(savedOpportunity);
  } catch (err) {
    return res.status(400).json("Something bad happend!");
  }
});

module.exports = opportunityController;
