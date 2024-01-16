import { Cloudinary } from "@cloudinary/url-gen";


const Upload = () =>{
    const upload = new Cloudinary({
        cloud:{
            cloudName: 'ddxniasgh'
        }
    })
}

module.exports = Upload