
async function getCharacters () {
    //const images = [];
    //const names = [];
    try{
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.3.1/data/es_ES/champion.json');
        const data = await response.json();
        const characters = await data.data
        //console.log(characters);
        return characters;
    } catch (err) {
        console.log(err);
    }
}

const characters = getCharacters();
//console.log(characters);

export {characters};
