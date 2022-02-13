
/*
async function getCharImage () {
    const images = [];
    try{
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.3.1/data/en_US/champion.json');
        const data = await response.json();
        const characters = await data.data
        //console.log(characters);
        for (const character in characters) {
            //console.log(characters[character].image.sprite);
            images.push(characters[character].image.full);
        }
        return images;
    } catch (err) {
        console.log(err);
    }
}
*/

async function getCharNames () {
    //const images = [];
    const names = [];
    try{
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.3.1/data/es_ES/champion.json');
        const data = await response.json();
        const characters = await data.data
        //console.log(characters);
        
        for (const character in characters) {
            //console.log(characters[character].image.sprite);
            //images.push(characters[character].image.full);
            //console.log(character);
            names.push(character);
        }
        return names;
    } catch (err) {
        console.log(err);
    }
}

const names = getCharNames();

async function getCharDescription () {
    const descriptions = [];
    try{
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/12.3.1/data/es_ES/champion.json');
        const data = await response.json();
        const characters = await data.data
        //console.log(characters);
        for (const character in characters) {
            //console.log(characters[character].image.sprite);
            descriptions.push(characters[character].title);
        }
        return descriptions;
    } catch (err) {
        console.log(err);
    }
}

const descriptions = getCharDescription();

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
console.log(characters);

export {names, descriptions, characters};
