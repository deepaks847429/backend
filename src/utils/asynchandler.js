const asynchandler=(reqhandler)=>{
 return (req, res, next)=>{
    Promise.resolve(reqhandler(re, res, next)).catch((err)=>next(err))
  }

}

export{asynchandler};
