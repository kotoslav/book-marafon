const mongoose = require('mongoose');
const Stage = mongoose.model('Stage');
const { validationResult } = require('express-validator');
const { checkAuth } = require('../utils/checkauth');



const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.stagesReadManyActive =  async function(req, res) {
try{
	const currentDate = new Date();
	const stageActive = await Stage.find({start: {$lte: currentDate }, end: {$gte: currentDate} }).exec();

	return res.status(200).json(stageActive);
 }catch(err) {
    return res.status(500).json({"message": "Something goes wrong"});
  }
};

module.exports.stagesReadMany =  async function(req, res) {
try{
	const stages = await Stage.find().exec();

	return res.status(200).json(stages);
 }catch(err) {
    return res.status(500).json({"message": "Something goes wrong"});
  }
};

module.exports.stagesReadOne =  async function(req, res) {
	try{
	const stageOne = await Stage.findById(req.params.stageid).exec();
    if (!stageOne) {
        return res.status(404).json({error: "stage is not found"});
    }
	return res.status(200).json(stageOne);
  }catch(err) {
    return res.status(500).json({"message": "Something goes wrong"});
  }
};

module.exports.stagesCreate =  async function(req, res) {
	  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  };

  if (await checkAuth(req, res) && ( req.role == "moderator" || req.role == "admin")) {
    try {
        const newStage = new Stage({
          start: req.body.start,
          end: req.body.end,
          target: req.body.target,
          groupName: req.body.groupName,
		  minAge: req.body.minAge,
		  maxAge: req.body.maxAge
        });
        newStage.save();
        return res.status(200).json({"status" : "success"});
    } catch(err) {
        return res.status(500).json({error: "something wrong"});
    }

  } else {
    return res.status(500).json({error: "Has not permission"});
  }
};

module.exports.stagesUpdateOne =  async function(req, res) {
  if (await checkAuth(req, res) && ( req.role == "moderator" || req.role == "admin"  )) {
    try {
        const stage = await Stage.findById(req.params.stageid).exec();
        if (!stage) {
            return res.status(404).json({error: "stage is not found"});
        }
        stage.start = req.body.start ?? stage.start;
        stage.end = req.body.end ?? stage.end;
        stage.target = req.body.target ?? stage.target;
        stage.groupName = req.body.groupName ?? stage.groupName;
        stage.minAge = req.body.minAge ?? stage.minAge;
        stage.maxAge = req.body.maxAge ?? stage.maxAge;
        await stage.save();
        return res.status(201).json({status: "success"});
    } catch(err) {
        console.log(err);
        return res.status(500).json({error: "something wrong"});
    }
  } else {
    return res.status(500).json({error: "Has not permission"})
  }
};

module.exports.stagesDelete =  async function(req, res) {
  if (await checkAuth(req, res) && ( req.role == "moderator" || req.role == "admin"  )) {
    try {
        const stage = await Stage.findOneAndRemove({_id:req.params.stageid}).exec();
    if (!stage) {
        return res.status(404).json({error: "stage is not found"});
    }
    } catch(err) {

    }

  } else {
    return res.status(500).json({error: "Has not permission"})
  }
  return res.status(200).json({"status" : "success"});
};
