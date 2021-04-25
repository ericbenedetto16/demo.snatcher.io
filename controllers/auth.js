const { User } = require("../models")

exports.createUser = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(req.body);

        // // TODO: Check for Collisions
        const obj = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
        });

        res.status(200).json({
            success: true,
            firstName: obj.firstName,
            lastName: obj.lastName
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error!',
        });
    }
};