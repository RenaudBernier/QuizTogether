export default function endRoundEarly(data, questionEnd){

    if(data.playerCount <= data.numberOfAnswers){
        questionEnd(0);
    }
}