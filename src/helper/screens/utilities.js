export const createSearchKeyWord = (ele,type='id') => {
    let result = ''
    switch (type) {
        case 'id':
            result = `#${ele}`
            break;
        case 'class':
            result = `.${ele}`
        default:
            result= ele.toString()
            break;
    }
    return result
}

export const removeListener = (element,type)=>{
    try {
        element.removeEventListener(type)
    } catch (error) {
        console.log(error)
    }
}