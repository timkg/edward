var edward = (function() {
    
    
    var version = '0.1.0';
    
    
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
    
    
    return {
        version: version,
        extend: extend,
        toString: toString
    };
    
    
}());