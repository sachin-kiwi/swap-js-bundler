import ReactDOMServer from 'react-dom/server';
export const jsxToHtml = (input) => ReactDOMServer.renderToString(input)

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
