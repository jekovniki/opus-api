const errorType = (errorCode: number) => {
    switch(errorCode) {
        case 400:
            return `BAD_REQUEST`;
        
        case 401:
            return `UNAUTHORIZED`;
        
        case 403:
            return `ACCESS_FORBIDDEN`;
            
        case 404:
            return `NOT_FOUND`;
            
        case 405:
            return `METHOD_NOT_ALLOWED`;
                    
        case 401:
            return `REQUEST_TIMEOUT`;

        default:
            return 'UNEXPECTED_ERROR';                  
    }
}

