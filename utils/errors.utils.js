module.exports.registerErrors = (err) => {
    let errors  = {pseudo : '' , email :'' , password:''};
    if(err.message.includes('pseudo')) errors.pseudo = "Pseudo incorect ou déja pris";
    
    if(err.message.includes('email')) errors.email = "Email incorrect";
    
    if(err.message.includes('password')) errors.password = "le mot de passe doit faire 6 carac minimum";
    
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) errors.email = "ce pseudo deja enregistré";
    
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) errors.email = "ce email deja enregistré";
    
    return errors;
}

module.exports.loginErrors = (err)=>{
    let errors = {email:'' , password:''};
    if(err.message.includes("email")) errors.email = "Email inconnu";
    if(err.message.includes("password")) errors.password = "mot de passe incorrecte";
    return errors;
}