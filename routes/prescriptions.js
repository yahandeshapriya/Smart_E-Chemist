const { Prescription } = require('../models/prescription');
const { Medication } = require('../models/medication');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) =>{
  
  const prescriptions = await Prescription.find().populate('doctor', 'firstName').populate({
    path: 'medications', populate : {
        path: 'medication'}
    }).sort({'dateCreated': -1}); //sort newest to older

    if(!prescriptions) {
        res.status(500).json({success: false})
    } 
    res.send(prescriptions);
})


router.get(`/:id`, async (req, res) =>{

  if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).send('Invalid id')
  }

  const prescription = await Prescription.findById(req.params.id)
  .populate('doctor', 'firstName')
  .populate({
      path: 'medications', populate : {
          path: 'medication'}
      });

  if(!prescription) {
      res.status(500).json({success: false})
  } 
  res.send(prescription);
})


router.get(`/mylist/:id`, async (req, res) =>{

  let filter = {doctor: req.params.id}
  
  const prescriptions = await Prescription.find(filter, {}).populate('doctor', 'firstName').populate({
    path: 'medications', populate : {
        path: 'medication'}
    }).sort({'dateCreated': -1}); //sort newest to older

    if(!prescriptions) {
        res.status(500).json({success: false})
    } 
    res.send(prescriptions);
})


router.get(`/pending/list`, async (req, res) =>{

  let filter = {status : 'Pending'}
  //using query parameters
  if(req.query.doctor)
  {
    filter = {status: 'Pending', doctor: req.query.doctor}
  }
  
  const prescriptions = await Prescription.find(filter, {}).populate('doctor', 'fullName').populate({
    path: 'medications', populate : {
        path: 'medication'}
    }).sort({'dateCreated': -1}); //sort newest to older

    if(!prescriptions) {
        res.status(500).json({success: false})
    } 
    res.send(prescriptions);
})


router.post(`/new`, async (req, res) => {

  const medications = Promise.all(req.body.medications.map(async medication => {
    let newMedication = new Medication({
        medication: medication.medication,
        amount : medication.amount,
        route: medication.route,
        frequency: medication.frequency,
        prn: medication.prn,
        howMuch: medication.howMuch,
        refills: medication.refills
    })

    newMedication = await newMedication.save();

    return newMedication._id;
  }))

  medicationsResolved = await medications;

  let prescription = new Prescription({

      patientName: req.body.patientName,
      patientAge: req.body.patientAge,
      medications : medicationsResolved,
      doctor: req.body.doctor,
      
  })

  prescription = await prescription.save();

  if(!prescription)
    return res.status(400).send('the prescription cannot be created!')

  res.send(prescription);

})


router.put('/:id', async (req, res) => {

  if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).send('Invalid id')
  }

  const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
          status: req.body.status
      },
      {new : true}
  )

  if(!prescription) {
      res.status(500).json({success: false, message: 'Cannot find prescription with given id!'})
  } 
  res.status(200).send(prescription);
})


router.delete('/:id', (req, res) => {
  Prescription.findByIdAndRemove(req.params.id).then(async prescription => {
      if(prescription){

          await prescription.medications.map(async medication => {
              await Medication.findOneAndRemove(medication)
          })

          res.status(200).json({
              success : true,
              message : 'Prescription deleted succesfully'
          })
      }else{
          res.status(404).json({
              success : false,
              message : 'Prescription not found'
          })
      }
  }).catch(err => {
      res.status(400).json({
          success : false,
          error: err
      })
  })
})


router.get(`/get/count`, async (req, res) => {
  const prescriptionCount = await Prescription.countDocuments();

  if(!prescriptionCount){
    res.status(500).json({success: false});
  }

  res.send({
    prescriptionCount : prescriptionCount
  });
})


module.exports = router