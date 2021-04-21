let display= document.getElementById('display_main')
let section = document.getElementById('display_element')
let sec = document.getElementById('main')
let h1 = document.createElement('h1')
let div = document.createElement('div')


/////////////////
//Clear content//
/////////////////
function clearContent(){
    
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
}

function clearContent2(){
    
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }  
}



///////////////////////
//Get main categories//
///////////////////////
fetch(`https://swapi.dev/api/`)
    .then(resp=>resp.json())
    .then(json =>displayMainCateg(json))

        
function displayMainCateg(json){
    let arr = Object.keys(json)
    arr.forEach(element => {
        let div = document.createElement('div')
            div.innerHTML=element
            div.id=`${element}`
            
            div.addEventListener('click', function(){               
                fetchCategory(element);
            })            
            sec.appendChild(div)
    });
}

///////////////////////////////////////////
//fetch each category once is clicked ^^^//
//////////////////////////////////////////
function fetchCategory(category){
    fetch (`https://swapi.dev/api/${category}/`)
        .then(resp=>resp.json())
        .then(json =>displayObjc(json))
}

/////////////////////////////
//Display category objects//
////////////////////////////
function displayObjc(json){
    console.log(json)
    clearContent();
    let arr=json.results
    let ul = document.createElement('ul')
    arr.forEach(element =>{
        let li = document.createElement('li')
        if(element.name){
            li.innerHTML=element.name
            li.addEventListener('click',function(){
                let elementUrl=`${element.url}`
                elementUrl = elementUrl.replace("http:", 'https:');
                console.log(elementUrl)
                fetchElementInfo(elementUrl)
            })
        }
        else{
            li.innerHTML=element.title
            li.addEventListener('click',function(){
                let elementUrl=`${element.url}`
                elementUrl = elementUrl.replace("http:", 'https:');
                fetchElementInfo(elementUrl)
            })
        }
        ul.appendChild(li)
    })
    display.appendChild(ul)
    
    let next = document.createElement('button')
    next.innerHTML='Next'
    let back = document.createElement('button')
    back.innerHTML='Back'
    ul.appendChild(back)
    ul.appendChild(next)

    next.addEventListener('click',function(){
        if(json.next!==null){
            let nextOrBackUrl=`${json.next}`
            nextOrBackUrl = nextOrBackUrl.replace("http:", 'https:');
            nextBackFunc(nextOrBackUrl)
            //console.log('next')
        }
    })

    back.addEventListener('click',function(){
        if(json.previous!==null){
            let nextOrBackUrl=`${json.previous}`
            nextOrBackUrl = nextOrBackUrl.replace("http:", 'https:');
            nextBackFunc(nextOrBackUrl)
            //console.log('back')
        }
    })
}

////////////////////////////////
//Next and Back button refresh//
////////////////////////////////
function nextBackFunc(url){
    fetch(url)
        .then(resp=>resp.json())
        .then(json =>displayObjc(json))
}

//////////////////////////////////////
//fetch element info when is clicked//
//////////////////////////////////////
function fetchElementInfo(url){
    fetch(url)
        .then(resp=>resp.json())
        .then(json =>displayElementInfo(json))
}

////////////////////////////////
//Display each element clicked//
////////////////////////////////
function displayElementInfo(json){
    if(json.birth_year){
        clearContent2()
        h1.innerHTML =`Film Character: ${json.name}`
        div.innerHTML =`<p>Birth Year: ${json.birth_year} </p>
                         <p>Gender: ${json.gender} </p>
                         <p>Height: ${json.height} cm</p> 
                         <p>Weight: ${json.mass} kg</p> 
                         <p>Hair Color: ${json.hair_color} </p>
                         <p>Skin Color: ${json.skin_color} </p>
                         <p>Eye Color: ${json.eye_color} </p>
                         <p>Google Link: <a href = 'https://www.google.com/search?q=${json.name}' target=_blank>Link</a><p>`
        section.appendChild(h1)
        section.appendChild(div)        
    }
    else if(json.rotation_period){
        clearContent2()
        h1.innerHTML =`Planet: ${json.name}`
        div.innerHTML =`<p>Climate: ${json.climate} </p>
                         <p>Terrain: ${json.terrain} </p>
                         <p>Diameter: ${json.diameter} km</p> 
                         <p>Rotation: ${json.rotation_period} hours</p> 
                         <p>Orbital: ${json.orbital_period} days </p>
                         <p>Population: ${json.population} </p>
                         <p>Gravity: ${json.gravity} </p>
                         <p>Google Link: <a href = 'https://www.google.com/search?q=${json.name}' target=_blank>Link</a><p>`
        section.appendChild(h1)
        section.appendChild(div)        
    }
    else if(json.title){
        clearContent2()
        h1.innerHTML =`Film: ${json.title}`
        div.innerHTML =`<p>Relase date: ${json.release_date} </p>
                         <p>Episode Id: ${json.episode_id} </p>
                         <p>Director: ${json.director} </p> 
                         <p>Producer: ${json.producer}</p> 
                         <p>Opening Crawl: ${json.opening_crawl}</p>
                         <p>Google Link: <a href = 'https://www.google.com/search?q=${json.title}' target=_blank>Link</a><p>`
        section.appendChild(h1)
        section.appendChild(div)        
    }
    else if(json.average_height){
        clearContent2()
        h1.innerHTML =`Specie: ${json.name}`
        div.innerHTML =`<p>Language: ${json.language} </p>
                         <p>Clasification: ${json.classification} </p>
                         <p>Designation: ${json.designation} </p> 
                         <p>Average Height: ${json.average_height} cm</p>
                         <p>Average Lifespan: ${json.average_lifespan} years</p>
                         <p>Eye Colors: ${json.eye_colors} </p>
                         <p>Hair Colors: ${json.hair_colors} </p>
                         <p>Skin Colors: ${json.skin_colors} </p>
                         <p>Google Link: <a href = 'https://www.google.com/search?q=${json.name}' target=_blank>Link</a><p>`
        section.appendChild(h1)
        section.appendChild(div)        
    }
    else if(json.MGLT){
        clearContent2()
        h1.innerHTML =`Starship: ${json.name}`
        div.innerHTML =`<p>Model: ${json.model} </p>
                         <p>Starship Class: ${json.starship_class} </p>
                         <p>Manufacturer: ${json.manufacturer} </p>
                         <p>Cost: ${json.cost_in_credits} credits</p> 
                         <p>Crew: ${json.crew}</p>
                         <p>Passengers: ${json.passengers} </p>
                         <p> Hyperdrive Rating: ${json.hyperdrive_rating}</p>
                         <p>Length: ${json.length}</p>
                         <p>Max Atmosphering Speed: ${json.max_atmosphering_speed} </p>
                         <p>Megalight Speed: ${json.MGLT} MGLT/hour </p>
                         <p>Google Link: <a href = 'https://www.google.com/search?q=${json.name}' target=_blank>Link</a><p>`
        section.appendChild(h1)
        section.appendChild(div)        
    }
    else{
        clearContent2()
        h1.innerHTML =`Vehicle: ${json.name}`
        div.innerHTML =`<p>Model: ${json.model} </p>
                         <p>Cargo Capacity: ${json.cargo_capacity} </p>
                         <p>Manufacturer: ${json.manufacturer} </p>
                         <p>Cost: ${json.cost_in_credits} credits</p> 
                         <p>Crew: ${json.crew}</p>
                         <p>Passengers: ${json.passengers}</p>
                         <p>Vehicle Class: ${json.vehicle_class}</p>
                         <p>Length: ${json.length}</p>
                         <p>Max Atmosphering Speed: ${json.max_atmosphering_speed}</p>
                         <p>Consumables: ${json.consumables}</p>
                         <p>Google Link: <a href = 'https://www.google.com/search?q=${json.name}' target=_blank>Link</a><p>`
        section.appendChild(h1)
        section.appendChild(div)        
    }
    
}

