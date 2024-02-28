
const { createInterview } = require('../repository/assessment-tool');


exports.interview = async function(req, res, next) {
    try {
        // console.log(req.body);
        const interview = await createInterview(req.body);
        res.send(interview);
    } catch (error) {
        console.error(error);
    }
}
