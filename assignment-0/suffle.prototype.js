export default Array.prototype.suffle = function() {
    let randomidx, temp;
    for(let i = this.length-1; i >= 0; i--) {
        // console.log(i);
        randomidx = Math.floor(Math.random()*(i+1));
        // console.log(randomidx);
        temp = this[randomidx];
        this[randomidx] = this[i];
        this[i] = temp;
    }
    return this
}