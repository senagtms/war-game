const {getRandom,randomHealt} = require("./helpers")

const teamA = [];
const teamB =  [];
let warstats={
    isFinish:false,
    winTeam:null
}

class Soldier{
    id;
    healt;
    level;
    damage;
    dead;
    constructor(id){
        this.id = id
        this.healt = randomHealt();
        this.level = getRandom(2)+1
        this.damage =  this.level*20;
        this.dead = false

    }

    subtrackHealt(){
        this.healt = this.healt - this.damage
        if(this.healt<0){
            this.healt = 0;
            this.dead = true
            console.log(this.id + "id li asker öldü")
        }

    }

}

for(let i=0 ; i<10;i++){
    teamA.push(new Soldier(i+1));
    teamB.push(new Soldier(i+11));
}

function fire(){
    return new Promise((resolve,reject)=>{
        const teamA_ = teamA.filter((item)=> item.dead == false); // A takımında canlı olan askerler
    const teamB_ = teamB.filter((item)=> item.dead == false);
    const randomAsoldier = teamA_[getRandom(teamA_.length)]
    const randomBsoldier = teamB_[getRandom(teamB_.length)]

    const firstFire= getRandom(150) % 2;

    if(!teamA_.length || !teamB_.length){
        warstats.isFinish=true;
        warstats.winTeam = teamA_.length===0 ? "teamB kazandı" : "teamA kazandı"
        console.log(warstats.winTeam)
        return
    }

    if(firstFire === 0){ //teamA TeamB ye ateş etti
        randomBsoldier.subtrackHealt(randomAsoldier.damage);
        console.log(randomAsoldier.id + " idli A askeri " + randomBsoldier.id + " idli B askerini vurdu")
        teamB.map(item=>{
            if( item.id == randomBsoldier.id){
                item.healt = randomBsoldier.healt
            }
        })
    }else{
        randomAsoldier.subtrackHealt(randomBsoldier.damage);
        console.log(randomBsoldier.id + " idli B askeri " + randomAsoldier.id + " idli A askerini vurdu");
        teamB.map(item=>{
            if( item.id == randomAsoldier.id){
                item.healt = randomAsoldier.healt
            }
        })
    }
    setTimeout(()=>{
        resolve(1)
    },500)

    })
    

}

async function runtime(){
    while(!warstats.isFinish){
        await fire()
    }
}
runtime()