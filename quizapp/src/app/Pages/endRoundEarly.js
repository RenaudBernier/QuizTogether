export default function endRoundEarly(data, questionEnd){

    if(data.playerCount >= data.nbOfAnswers){
        questionEnd(0);
    }
}