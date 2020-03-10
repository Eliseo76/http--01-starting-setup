import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost:null
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        //check if props id is not null, if a post has been selected do this.
        if(this.props.id){
            //check if loadedPost is null then execute
            //Or if loadedPost is truthy and its not already === to props.id then execute
            //this will prevent the state from being updated and the api called if
            //its already in the loadedPost state, but if a new post is selected
            //then props.id is different from loadedPost.id and needs to be updated
            //then it will stop because both are === thus stopping the renders
            if( !this.state.loadedPost ||
                this.state.loadedPost && this.state.loadedPost.id !== this.props.id){
                axios.get('https://jsonplaceholder.typicode.com/posts/'+ this.props.id)
                    .then(response =>{
                        // console.log(response);
                        this.setState({loadedPost:response.data});
                    })
            }

        }
    }
    render () {
        //post version 1
        //this is the initial text before a selection. after 1st render
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        //post version 2
        //this is the text while we are waiting for state to change. after "props.id"
        // state changed and 2nd render.
        if(this.props.id) {
            post = <p style={{textAlign: "center"}}>Loading!</p>;
        }
            //post version 3
            //this is the after the promise is fulfilled state is changed
        // and now the render begins and loadedPost is now truthy, so the
        // Post is now populated in the site.
            if(this.state.loadedPost) {
                post = (
                    <div className="FullPost">
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete">Delete</button>
                        </div>
                    </div>

                )
            }

        return post;
    }
}

export default FullPost;