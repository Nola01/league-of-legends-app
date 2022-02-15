
async function getCharacters () {
    try{
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/12.3.1/data/es_ES/champion.json');
        const data = await response.json();
        const characters = await data.data
        return characters;
    } catch (err) {
        console.log(err);
    }
}

const characters = getCharacters();

async function getCharacterById (id) {
    //const character = {};
    try{
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/12.3.1/data/es_ES/champion.json');
        const data = await response.json();
        const characters = await data.data
        for (const char in characters) {
            if (characters[char].id === id) {
                const character = characters[char];
                return character;
            }
          }
    } catch (err) {
        console.log(err);
    }
}

//const character = getCharacterById('Ahri').then(char => console.log(char));


export {characters, getCharacterById};
