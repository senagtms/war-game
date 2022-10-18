function getRandom(n){
    return Math.floor(Math.random()* n)
}


function randomHealt(){
    const healt = [80,100,120]
    return healt[getRandom(2)]
}

module.exports = { getRandom , randomHealt}