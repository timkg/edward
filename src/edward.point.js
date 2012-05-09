var edward = edward || {};


edward.Point = (function(){
    
    function Point( x, y ) {
        
        this.x = ( x ? x : 0 );
        this.y = ( y ? y : 0 );
        
        return this;
    }
    
    var p = Point.prototype;
    
    edward.extend( p, {
        distanceTo: edward.utils.distanceTo
    } );
    
    return Point;
    
}());