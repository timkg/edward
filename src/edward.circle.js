var edward = edward || {};

edward.Circle = (function(){
    
    
    function Circle( center, radius ) {
        
        if( !center.x || !center.y ) {
            return false;
        }
        
        this.x = center.x;
        this.y = center.y;
        this.radius = radius;
        
        return this;
        
    }
    
    var p = Circle.prototype;
    
    edward.extend( p, {
        distanceTo: edward.utils.distanceTo
    } );
    
    return Circle;
    
    
    
}());