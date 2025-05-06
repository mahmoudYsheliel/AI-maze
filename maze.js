let gen_num=1
let population=100
let score=0
let lvl=2

let obstacles=[]
let borders=document.getElementById('container').children
let agents=[]
let alive=true




class obstcale{
    constructor(heigh){
        this.width=Math.floor(Math.random()*200+400)
        this.height=25 
        this.top=Math.floor(1000/lvl/2*heigh+350)
        this.left=Math.floor(Math.random()*400)
    }

    create(){
        let obs=document.createElement("div")
        obs.classList.add("border")
        obs.style.top=this.top
        obs.style.left=this.left
        obs.style.height=this.height
        obs.style.width=this.width
        document.getElementById("container").appendChild(obs)
        this.obstacle=obs
    }
    kill(){
        document.getElementById("container").removeChild(this.obstacle)
    }
}




class agent{
    constructor(){
        this.top= 900
        this.left=480
        this.speed=30
        this.movable=true
        this.modified_genom=[]
        this.genom=[]
    }
    create(){
            let agent=document.createElement("div")
            agent.classList.add("agent")
            agent.style.top=this.top
            agent.style.left=this.left
            document.getElementById("container").appendChild(agent)
            this.agent=agent
        }
    kill(){
        document.getElementById("container").removeChild(this.agent)
        }
    crossover(first_,second_,third_){
        let  first=[...first_]
        let  second=[...second_]
        let  third=[...third_]

        let genom=[]
        let rand=Math.random()
        if(rand>0.9){
            genom=first
        }
        else if(rand>0.85){
            genom=second
        }
        else if(rand>0.8){
            genom=third
        }
        else if(rand>0.4){
            if(first.length>second.length){
                genom=second
                for(let i=0;i<first.length;i++){
                    if(Math.random()>0.5){
                        genom[i]=first[i]
                    }
                }
            }
            else{
                genom=first
                for(let i=0;i<second.length;i++){
                    if(Math.random()>0.5){
                        genom[i]=second[i]
                    }
                }
            }
        }
        else if(rand>0.2){
            if(third.length>second.length){
                genom=second
                for(let i=0;i<third.length;i++){
                    if(Math.random()>0.5){
                        genom[i]=third[i]
                    }
                }
            }
            else{
                genom=third
                for(let i=0;i<second.length;i++){
                    if(Math.random()>0.5){
                        genom[i]=second[i]
                    }
                }
            }
        }
        else {
            if(third.length>first.length){
                genom=first
                for(let i=0;i<third.length;i++){
                    if(Math.random()>0.5){
                        genom[i]=third[i]
                    }
                }
            }
            else{
                genom=third
                for(let i=0;i<first.length;i++){
                    if(Math.random()>0.5){
                        genom[i]=first[i]
                    }
                }
            }
        }
        rand=Math.random()
        if(rand<0.8){
            for(let i=0;i<genom.length;i++){
                let num=Math.random()
                if(num>0.95){
                    genom[i]='top'
                }
                else if(num>0.9){
                    genom[i]='right'
                }
                else if(num>0.85){
                    genom[i]='left'
                }
                else if(num>0.8){
                    genom[i]='bottom'
                }
            }
        }
        
        
        this.modified_genom=genom
    }

    addgenom(){
        if(this.movable && this.modified_genom.length>this.genom.length){
            this.genom[this.genom.length]=this.modified_genom[this.genom.length]
            
        }
        else if(this.movable){
            let rand=Math.random()
            if (rand<0.25) {
                this.genom[this.genom.length]='top'
            }
            else if (rand<0.5) {
                this.genom[this.genom.length]='bottom'
            }
            else if (rand<0.75) {
                this.genom[this.genom.length]='left'
            }
            else if (rand<1) {
                this.genom[this.genom.length]='right'
            }

        }
        
    }
    move(){
        this.addgenom()
        let direction=this.genom[this.genom.length-1]
        if(this.movable){
            if (direction=='top') {
                this.top= this.top-this.speed
            }
            else if (direction=='bottom') {
                this.top= this.top+this.speed
            }
            else if (direction=='left') {
                this.left= this.left-this.speed
            }
            else if (direction=='right') {
                this.left= this.left+this.speed
            }
            this.agent.style.top=this.top
            this.agent.style.left=this.left
            this.check()
        }
    }
    move_direction(direction){
        this.genom[this.genom.length]=direction
        if(this.movable){
            if (direction=='top') {
                this.top= this.top-this.speed
            }
            else if (direction=='bottom') {
                this.top= this.top+this.speed
            }
            else if (direction=='left') {
                this.left= this.left-this.speed
            }
            else if (direction=='right') {
                this.left= this.left+this.speed
            }
            this.agent.style.top=this.top
            this.agent.style.left=this.left
            this.check()
        }
    }
    check(){
        for (let i=0;i<5;i++){
            if (elementsOverlap(borders[i],this.agent )){
                this.movable=false
                this.fit()
                return
            }
        }
        for (let i=0;i<lvl;i++){
            if (elementsOverlap(obstacles[i].obstacle,this.agent)){
                this.movable=false
                this.fit()
                return
            }
        }
        if(this.genom.length>1000){
            this.movable=false
            this.fit()
            return
        }
    }

    fit(){
        this.fitness=-Math.sqrt((this.top-100)**2+(this.left-480)**2)-(this.left-480)-(this.top-100)+0.01*this.genom.filter((v) => (v === 'top')).length//-0.01*this.genom.length
    }
}












function popilategeneration(){
    alive=false
    for(let i=0;i<population;i++){
        agents[i].move()
        if(agents[i].movable){
            alive=true
        }
    }
    if(alive){
        setTimeout(popilategeneration,1)
    }

    if(!alive){
        let first=0
        let second=0
        let third=0
        let result=fitest()
        first=result[0]
        second=result[1]
        third=result[2]
        //killlvl()
        //createlvl()
        killagents()
        createagents()
        crossover(first,second,third)
        setTimeout(popilategeneration,100)   
    }
}


function crossover(first,second,third){
    for(let i=0;i<population;i++){
        agents[i].crossover(first,second,third)
    }
}

function fitest(){
    let first=0
    let second=0
    let third=0
    for (let i=0;i<population;i++){
        if (agents[i].fitness>agents[first].fitness){
            third=second
            second=first
            first=i
        }
    }
    score=agents[first].fitness
    gen_num=gen_num+1
    document.getElementById('genvalue').innerText=gen_num
    document.getElementById('scorevalue').innerText=score
    console.log(agents[first].genom,agents[second].genom,agents[third].genom)
    return [agents[first].genom,agents[second].genom,agents[third].genom]

}



function createagents(){
    for(let i=0;i<population;i++){
        let agen=new agent()
        agen.create()
        agents.push(agen)
    }
}

function createlvl(){
    for(let i=0;i<lvl;i++){
        let obs=new obstcale(i)
        obs.create()
        obstacles.push(obs)
    }
}

function killagents(){
    for(let i=0;i<population;i++){
        agents[i].kill()
    }
    agents=[]
}
function killlvl(){
    for(let i=0;i<lvl;i++){
        obstacles[i].kill()
    }
    obstacles=[]
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}


createlvl()
createagents()
popilategeneration()



//=========================================================//
