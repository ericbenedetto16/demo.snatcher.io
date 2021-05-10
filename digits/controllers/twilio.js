const client = require('twilio')();

exports.sendSMS = async (req, res) => {
    try {
        const { msgBody } = req.body;
        const msg = await client.messages.create({
            body: msgBody,
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
        // eslint-disable-next-line no-console
        console.log(err);

        res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};
