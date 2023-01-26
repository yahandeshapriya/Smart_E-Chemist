const { Drug } = require('../models/drug')
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

router.get('/', async (req, res) => {
    
    const drugList = await Drug.find()

    if(!drugList) {
        res.status(500).json({success: false})
    }
    else {
        res.send(drugList)
    }

})

router.get('/:id', async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid id')
    }

    const drug = await Drug.findById(req.params.id)

    if(!drug) {
        res.status(500).json({success: false})
    }
    else {
        res.send(drug)
    }

})

router.post('/new/drug', async (req, res) => {

    let drug = new Drug({
        generic_name : req.body.generic_name,
        brand_name : req.body.brand_name,
        dosage_form : req.body.dosage_form,
        manufacturer : req.body.manufacturer
    })

    drug = await drug.save()

    if(!drug) {
        res.status(500).json({success: false})
    }
    else {
        res.send(drug)
    }

})

router.put('/update/:id', async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid id')
    }

    let drug = {
        generic_name : req.body.generic_name,
        brand_name : req.body.brand_name,
        dosage_form : req.body.dosage_form,
        manufacturer : req.body.manufacturer
    }

    drug = await Drug.findByIdAndUpdate(req.params.id, drug, {new: true})

    if(!drug) {
        res.status(500).json({success: false})
    }
    else {
        res.send(drug)
    }

})

router.delete('/delete/:id', (req, res) => {

    Drug.findByIdAndDelete(req.params.id)
        .then(deletedDrug => {
            if(deletedDrug) {
                res.status(200).json({
                    success: true,
                    message: 'drug deleted succussfully'
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'drug not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            })
        })

})

module.exports = router;