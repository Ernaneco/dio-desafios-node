const player1 = {
    NOME: "Mário",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result
    
}
async function logRollResult(nomePersonagem, block, diceResult, atributo) {
    console.log(`${nomePersonagem} 🎲 rolou um dado de ${block} ${diceResult} + ${atributo} = ${diceResult + atributo}`);
}
async function playRaceEngine(personagem1, personagem2) {
    for (let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + personagem1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + personagem2.VELOCIDADE;
            
            await logRollResult(player1.NOME, "velocidade", diceResult1, personagem1.VELOCIDADE);
            await logRollResult(player2.NOME, "velocidade", diceResult2, personagem2.VELOCIDADE);
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + personagem1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + personagem2.MANOBRABILIDADE

            await logRollResult(player1.NOME, "manobrabilidade", diceResult1, personagem1.MANOBRABILIDADE);
            await logRollResult(player2.NOME, "manobrabilidade", diceResult2, personagem2.MANOBRABILIDADE);

        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + personagem1.PODER;
            let powerResult2 = diceResult2 + personagem2.PODER;

            console.log(`${personagem1.NOME} confrontou ${personagem2.NOME}! 🥊`);

            await logRollResult(player1.NOME, "poder", diceResult1, personagem1.PODER);
            await logRollResult(player2.NOME, "poder", diceResult2, personagem2.PODER);

            if (powerResult1 > powerResult2 && personagem2.PONTOS > 0) {
                console.log(
                    `${personagem1.NOME} venceu o confronto! ${personagem2.NOME} perdeu 1 ponto 🐢`
                );
                personagem2.PONTOS--;
            }
            if (powerResult2 > powerResult1 && personagem1.PONTOS > 0) {
                console.log(
                    `${personagem2.NOME} venceu o confronto! ${personagem1.NOME} perdeu 1 ponto 🐢`
                );
                personagem1.PONTOS--;
            }
            
            console.log(powerResult2 === powerResult1
                ? "Confronto empatado! Nenhum ponto foi perdido!" : ""
            )
        }

        //verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${personagem1.NOME} marcou 1 ponto!`);
            personagem1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${personagem2.NOME} marcou 1 ponto!`);
            personagem2.PONTOS++;
        }

        console.log("------------------------------------------")
    }
    
}

async function declareWinner(personagem1, personagem2) {
    console.log("Resultado final:");
    console.log(`${personagem1.NOME}: ${personagem1.PONTOS}`)
    console.log(`${personagem2.NOME}: ${personagem2.PONTOS}`)
    if (personagem1.PONTOS > personagem2.PONTOS)
        console.log(`\n${personagem1.NOME} venceu a corrida! Parabéns! 🏆`);
    else if (personagem2.PONTOS > personagem1.PONTOS)
        console.log(`\n${personagem2.NOME} venceu a corrida! Parabéns! 🏆`);
    else
        console.log("A corrida terminou empatada!");
    
}
// Função auto invocável
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();


// main()