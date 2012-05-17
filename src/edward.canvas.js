var edward = edward || {};

edward.canvas = (function() {
    
    
    var lineCapValues = ['butt', 'round', 'square'],
        lineJoinValues = ['round', 'bevel', 'miter'];
        
    
    function lineTo( destination, ctx ) {
        
        if( !this.x || !this.y ) {
            edward.error( 'lineTo()\'s host object needs an x and y value' );
        }
        
        ctx.beginPath();
        ctx.moveTo( this.x, this.y );
        ctx.lineTo( destination.x, destination.y );
        ctx.stroke();
        
        return destination;
        
    }
    
    return {
        lineTo: lineTo
    };
    
}());