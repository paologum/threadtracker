function assertBrandType(o) {
    if (typeof o !== 'object') throw 'BrandType must be an object' 
    if (typeof o.name !== 'string') throw 'BrandType must have a name that is a string type'
    if (typeof o.creator !== 'string') throw 'BrandType must have a creator that is a string type'
    if (typeof o.startingDate !== 'date') throw 'BrandType must have a date that is a date type'
    if (typeof o.luxury !== 'boolean') throw 'BrandType must have a luxury variable that is a boolean type'
    if (typeof o.luxury !== 'number') throw 'BrandType must have a rating variable that is a number type'
}
module.exports = { assertBrandType };