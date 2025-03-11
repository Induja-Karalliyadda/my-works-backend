import nodemailer from 'nodemailer'

export const accountEmail = 'indujakaralliyadda99@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: "budl yixu avnf hrzm"
  }     
})

export default transporter