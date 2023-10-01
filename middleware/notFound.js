const notFound = (req,res,next) => {
    return res.status(404).json({msg:'Requested page is not found'});
}

module.exports = notFound;