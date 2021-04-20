const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here



router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try{
    const dronesFromDB = await Drone.find();
    res.render('drones/list', { dronesFromDB })
  } catch(e) {
    res.render('error');
    console.log(`An error ocurred (${e})`)
  }
});

router.get('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try{
    res.render('drones/create-form')
  } catch(e) {
    res.render('error');
    console.log(`An error occured (${e})`)
  }
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try{
    const { name, propellers, maxSpeed} = req.body;
    await Drone.create(req.body);
    res.redirect('/drones');
  } catch(e) {
    res.render('error')
    console.log(`An error occured ${e}`);
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try{
    const droneId = req.params.id
    const drone = await Drone.findById(droneId);
    res.render('drones/update-form', { drone })
  } catch(e) {
    res.render('error')
    console.log(`An error occured ${e}`);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try{
    const droneId = req.params.id;
    const { name, propellers, maxSpeed} = req.body;
    await Drone.findByIdAndUpdate(droneId, {
      name,
      propellers,
      maxSpeed
    });
    res.redirect('/drones');
  } catch(e) {
    res.render('error')
    console.log(`An error occured ${e}`);
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  const droneId = req.params.id;
  await Drone.findByIdAndDelete(droneId);

  res.redirect('/drones')
});

module.exports = router;
