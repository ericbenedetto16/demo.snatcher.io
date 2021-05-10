exports.formatRecipient = (req, res, next) => {
    // TODO: Strip Whitespace from Number
    // TODO: Enforce Regex Check for \+\d Format
    req.formattedRecipient = req.body.recipient;

    next();
};
