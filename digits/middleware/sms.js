exports.formatRecipient = (req, res, next) => {
    // TODO: Strip Whitespace from Number
    // TODO: Enforce Regex Check for \+\d Format
    req.formattedRecipient = req.body.recipient;

    next();
};

exports.injectLink = (req, res, next) => {
    const regex = /{URL}/g;
    if (regex.test(req.body.msgBody) === false) {
        req.msgBody = `${req.body.msgBody} ${req.body.slug} `;

        return next();
    }

    req.msgBody = req.body.msgBody.replace(regex, ` ${req.body.slug} `);
    next();
};
