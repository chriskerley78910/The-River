class AbstractModel {
  parsePositiveIntegerProp(obj, name){
    const val = obj[name]
    if(!Number.isInteger(val) || val < 1)
      throw new Error(`${name} must be a positive integer.`)
    return val
  }
}
module.exports = AbstractModel
