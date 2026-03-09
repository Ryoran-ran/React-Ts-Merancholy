export function countFlip(checkRev :Boolean ,countRev: number ,lemitRev: number):number{
    if(!checkRev && lemitRev-1 >= countRev){
        return countRev + 1;
    }
    
    return countRev

}