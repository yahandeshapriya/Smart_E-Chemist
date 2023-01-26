const { Doctor } = require('../models/doctor')
const { Token } = require('../models/token')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const multer = require('multer')
const sendEmail = require('../helpers/email')


const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg' ,
    'application/pdf' : 'pdf'
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid Image type')

        if(isValid) {
            uploadError = null
        }

        cb(uploadError, 'public/documents')
    },
    filename: function(req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const extention = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extention}`)
    }
})

const uploadOptions = multer({storage: storage})

router.get('/', async (req, res) => {
    const doctorList = await Doctor.find().select('-passwordHash')

    if(!doctorList) {
        res.status(500).json({
            success: false
        })
    }

    res.send(doctorList)
})

router.get('/get/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(500).send('Invalid id')
    }

    const doctor = await Doctor.findById(req.params.id).select('-passwordHash')

    if(!doctor) {
        res.status(500).json({
            success: false,
            message: 'Cannot find a doctor with given id'
        })
    }

    res.send(doctor)
})

router.post('/register', uploadOptions.single('slmcDocument'), async (req, res) => {
    
    const file = req.file

    if(!file) {
        return res.status(400).send('No Document in request')
    }

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/documents/`

    let doctor = new Doctor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        nic: req.body.nic,
        address: req.body.address,
        slmcRegNo: req.body.slmcRegNo,
        speciality: req.body.speciality,
        hospital: req.body.hospital,
        slmcDocument: `${basePath}${fileName}`,
        username: req.body.username,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10)
    })

    doctor = await doctor.save()

    let token = await new Token({
        doctor_id: doctor._id,
        token: crypto.randomBytes(32).toString("hex")
    }).save()

    const message = `${process.env.BASE_URL}/verify/${doctor._id}/${token.token}`
    const subject = 'Verify your email to start journey with Project RX'

    await sendEmail(doctor.email, subject, message)

    if(!doctor) {
        return res.status(500).json({
            success: false,
            message: 'Error'
        })
    }

    res.send(doctor)
})

router.get('/verify/:id/:token', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)

        if(!doctor) return res.status(400).send('invalid link')

        const token = await Token.findOne({
            doctor_id: doctor._id,
            token: req.params.token
        })

        if(!token) return res.status(400).send('invalid link')

        await Doctor.findByIdAndUpdate(
            doctor._id,
            {
                isEmailVerified : true
            }
        )

        await Token.findByIdAndRemove(token._id)

        res.send('email verify successfully')

    } catch (error) {
        res.status(400).send('An error occured')
    }
})

router.put('/update/:id', async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid id')
    }

    const updatedInfo = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            address: req.body.address,
            slmcRegNo: req.body.slmcRegNo,
            speciality: req.body.speciality,
            hospital: req.body.hospital,
        },
        {new: true}
    )
    
    if(!updatedInfo) {
        res.status(500).json({
            success: false,
            message: 'Cannot update record'
        })
    }

    res.status(200).send(updatedInfo)
})

router.delete('/delete/:id', (req, res) => {

    Doctor.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            if(deletedUser) {
                res.status(200).json({
                    success: true,
                    message: 'User deleted succussfully'
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
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

router.get('/get/count', async (req, res) => {
    const count = await Doctor.countDocuments()

    if(!count) {
        res.status(500).json({success: false})
    }

    res.send({count})
})

router.post('/login', async (req, res) => {
    const doctor = await Doctor.findOne({username : req.body.username});
  
    if(!doctor){
        return res.status(401).json({
            success: false,
            message: 'User not found'
        });
    }
  
    if(doctor && bcrypt.compareSync(req.body.passwordHash, doctor.passwordHash)){

        return res.status(200).send(doctor);

    }else{
        return res.status(403).send('Incorrect Password')
    }
  
  })


  router.put('/profileverify/:id', async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid id')
    }

    const updatedInfo = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
            isProfileVerified: req.body.isProfileVerified
        },
        {new: true}
    )
    
    if(!updatedInfo) {
        res.status(500).json({
            success: false,
            message: 'Cannot update record'
        })
    }

    res.status(200).send(updatedInfo)
})

router.patch('/password/:id', async (req, res) => {
    
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid id')
    }

    const doctor = await Doctor.findById(req.params.id)

    if(!doctor){
        res.status(500).json({success: false})
    }

    if(user && bcrypt.compareSync(req.body.currentPassword, doctor.passwordHash)) {
        await doctor.findByIdAndUpdate(
            req.params.id,
            {
                passwordHash: bcrypt.hashSync(req.body.newPassword, 10)
            }
        )

        return res.status(200).send('Password changed successfully!')
    } else {
        res.status(500).json({success: false})
    }
})

router.put('/profilepic/:id', uploadOptions.single('profilePic'), async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Id')
    }

    let doctor = await Doctor.findById(req.params.id)

    if(!doctor) return res.status(400).send('Invalid user id')

    const file = req.file
    let imagepath

    if(file) {
        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        imagepath = `${basePath}${fileName}`
    } else {
        imagepath = doctor.profilePic
    }

    doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
            prifilePic : imagepath
        },
        {new: true}
    )

    if(!doctor) {
        res.status(500).json({
            success: false
        })
    }

    res.status(200).json({
        success: true
    })
})


module.exports = router