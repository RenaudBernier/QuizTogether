export default function endRoundEarly(data, questionEnd){

    if(data.playerCount <= data.numberOfAnswers && data.playerCount !== 0){
        questionEnd(0);
    }
}