import nodeMailer from 'nodemailer'

export const sendMail = async ({email , message , subject}) =>{
    const transporter = nodeMailer.createTransport({
        host : 'smpt.gmail.com',
        port : 465,
        service : process.env.SMPT_SERVICE,
        auth : {
            user : process.env.SMPT_EMAIL,
            pass : process.env.SMPT_PASSWORD
        }
    })

    const options = {
        from : process.env.SPMT_EMAIL,
        to : email,
        subject,
        text : message
    }
    await transporter.sendMail(options)
}