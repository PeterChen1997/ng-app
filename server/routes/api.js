const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://admin:admin@ds111754.mlab.com:11754/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db,{useMongoClient:true},function(err){
    if(err){
        console.log("Error!" + err);
    }
});

router.get('/videos',function(req,res){
    console.log('Get request for all videos');
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("Error retreving videos");
        }else {
            res.json(videos);
            console.log("Done!");
        }
    });
});

router.get('/videos/:id',function(req,res){
    console.log('Get request for single video   ');
    Video.findById(req.params.id)
    .exec(function(err,video){
        if(err){
            console.log("Error retreving single video");
        }else {
            res.json(video);
            console.log("Done!");
        }
    });
});

module.exports = router;