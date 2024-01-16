import React, { useEffect, useState } from 'react'
import Header from '../../component/header'


class Welcome extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: 'fazztrack'
        }
    }

    componentDidMount(){
        console.log('only when opening website')
    }

    // componentDidUpdate(){

    // }

    // componentWillUnmount(){

    // }

    render() {
      return <h1>Hello, {this.state.name}</h1>;
    }
  }


function Example () {
    const [name, setName] = useState('')
    //getter, setter

    useEffect (()=> {
        console.log('hook didmount')
        setName('jokowidodo turun jabatan')
    },[])


    useEffect (()=> {
        console.log('hook didUpdate')
    },[name])


    // useEffect (()=> {
    //     return () =>{
    //         console.log('hook willUnmount')
    //     } 
    // })

    const changeName = (e) => {
        setName(e.target.value)
    }

    return(
        
        <div className='container'>

            <Header name={name}/>

            <div className='Example'>

                <h1>Hello world {name}</h1>
                <input onChange={changeName} type='text'></input>
            </div>

        </div>
        


    )
}

export default Example
