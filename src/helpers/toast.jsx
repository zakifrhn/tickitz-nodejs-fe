import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

function Show(msg, types){
    toast(msg, {
        type: types,
        closeOnClick: true
    })
}

function Container(){
    return <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} pauseOnFocusLoss={false} theme="light"/>
}

export {Container, Show}