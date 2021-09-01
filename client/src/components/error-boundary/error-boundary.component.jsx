import React from 'react'

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-bounder.style'

class ErrorBoundary extends React.Component{

    constructor(){
        super()

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        //process error
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log('componentdidcatch errorBoundary ', error, info);
    }

    render() {
        if(this.state.hasError){
            return (
                // <div>SOMETHING WENT WRONG</div>
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png' />
                        <ErrorImageText>Sorry the page is nowhere to be found</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        else{
            return this.props.children
        }
    
    }
}

export default ErrorBoundary
