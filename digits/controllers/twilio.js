const client = require('twilio')();

exports.sendSMS = async (req, res) => {
    try {
        const msg = await client.messages.create({
            body: req.msgBody,
            from: process.env.TWILIO_NUMBER,
            to: req.formattedRecipient,
        });

        if (msg.status === 'failed' || msg.status === 'undelivered') {
            throw new Error(
                `Twilio Error: ${msg.errorCode} ${msg.errorMessage}`
            );
        }

        // TODO: Implement Database Stuff

        res.status(200).json({
            success: true,
            msg: 'Message Sent Successfully',
        });
    } catch (err) {
        if (err.status === 400 && err.code === 21211) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid Phone Number',
            });
        }

        // eslint-disable-next-line no-console
        console.log(err);

        res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};
