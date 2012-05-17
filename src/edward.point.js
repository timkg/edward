var edward = edward || {};


edward.Point = (function(){
    
    function Point( x, y ) {
        
        this.x = ( x || 0 );
        this.y = ( x || 0 );
        
        return this;
    }
    
    edward.extend( Point.prototype, {
        distanceTo: edward.utils.distanceTo,
        lineTo: edward.canvas.lineTo
    } );
    
    return Point;
    
}());