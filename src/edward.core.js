var edward = (function() {
    
    
    var version = '0.1.0',
        errorLog = [],
        throwErrors = true;
    
    
    function extend( obj, extension ) {
        obj = obj || {};
        extension = extension || {};
            
        for( var prop in extension ) {
            obj[prop] = extension[prop];
        }
        
    }
    
    
    
    function toString() {
        return 'Edward v' + version;
    }
    
    
    
    function noErrors() {
        
        edward.throwErrors = false;
        
    }
    
    
    function error( message ) {
        
        if( edward.throwErrors ) {
            throw( message );
        } else {
            edward.errorLog.push( message );
        }
        
    }
    
    return {
        version: version,
        errorLog: errorLog,
        throwErrors: throwErrors,
        extend: extend,
        toString: toString,
        noErrors: noErrors,
        error: error
    };
    
    
}());