import React from "react";
import api from "../service/api";

const Playlist = ({artistName}) => {

    api.get(`artist/27`)
        .then(response=> {
            console.log(response.data);
        })
        .catch(error => {
            console.warn(error);

    return(

    )
}