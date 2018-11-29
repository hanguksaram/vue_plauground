const multiply = (a) => {
    const acc = a
    if (a === undefined) {
        return acc || 0      
    }
    return (b) => {
        if (b === undefined)
            return acc
        return multiply(acc * b)
        }
    }

console.log(multiply(1)(2)(3)(4)())