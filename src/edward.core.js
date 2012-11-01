if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([], function() {

    var version = '0.1.0',
        errorLog = [],
        messageLog = [],
        throwErrors = true;
    
    
    function extend( _obj, _extension ) {
        
        var obj = _obj || {},
            extension = _extension || {};
            
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
    
    
    function log( message ) {
        if( typeof window.console !== 'undefined' ) {
            window.console.log( message );
        } else {
            edward.messageLog.push( message );
        }
    }
    
    return {
        version: version,
        errorLog: errorLog,
        throwErrors: throwErrors,
        extend: extend,
        toString: toString,
        noErrors: noErrors,
        error: error,
        log: log
    };
});