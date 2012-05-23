var edward = edward || {};

edward.Vector = (function() {
    
    
    
    function Vector( magnitude, direction ) {
        
        this.x = magnitude * edward.trig.cos( direction );
        this.y = magnitude * edward.trig.sin( direction );
        
        return this;
    }
    
    
    Vector.prototype.add = function( otherVector ) {
        
        if( !(this.x || this.y)  ) {
            edward.error( 'Vector.add needs to be called in the context of another vector' );
        }
        
        this.x += otherVector.x;
        this.y += otherVector.y;
        
        return this;
        
    };
    
    return Vector;
    
}());