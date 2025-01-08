const asyncHandler = (reqHandler) => async(req, res, next)=>{
    Promise.resolve(reqHandler(req,res,next))
    .catch((err) => next(err));
};

export {asyncHandler};