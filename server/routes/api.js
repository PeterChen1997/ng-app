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

//Get Videos
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

//Get single video
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

//Save video
//req and res's position can not be changed!!!
router.post('/video',function(req,res){
    console.log("Post a video");
    console.log(req.body);
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function (err,insertedVideo) {
        if(err){
            console.log("Error in saving video");
        }else {
            res.json(insertedVideo);
        }
    });
});

//update the video
router.put('/video/:id',function(req,res){
    console.log("Update a video");
    Video.findByIdAndUpdate(req.params.id,
    {
        $set:{
            title:req.body.title,
            url: req.body.url,
            description:req.body.description
        }
    },
    {
        new: true
    },
    function(err,updatedVideo){
        if(err){
            console.log("Error updating video");
        }else {
            res.json(updatedVideo);
        }
    });
})

//Delete a video
router.delete('/video/:id',function(req,res){
    console.log("Deleting a video");
    Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
        if(err){
            res.send("Error deleting video");
        }else {
            res.json(deletedVideo);
        }
    });
});

module.exports = router;