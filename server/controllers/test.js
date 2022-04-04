
/**
 * test : function to test if server is running and return message
 * @param {json} req : request object.
 * @param {json} res : response object.
 * @return {json} JSON message success or error
 */
 exports.test = (req, res) => {
   
    res.json({ message: `Test success v1.0.1`  });
 
};