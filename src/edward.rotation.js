var edward = edward || {};

edward.rotation = (function(){
    
    
    function getRotationTo( point ) {
        
        return edward.trig.atan2( point );
        
    }
    
    return {
        getRotationTo: getRotationTo
    };
    
}());