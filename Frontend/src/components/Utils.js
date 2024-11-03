import {toast} from 'react-toastify'
const handelSuccess=(msg)=>{
    toast.success(msg,{
        position:'top-right'
    })
}
const handelError=(msg)=>{
    toast.error(msg,{
        position:'top-right'
    })
}
export {
    handelSuccess,
    handelError
}