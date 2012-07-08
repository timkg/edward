var edward = edward || {};

edward.canvas = (function() {
    
    
    function clear( canvas ) {
        
        if( edward.dom.isDomNode( canvas ) ) {
            
            var ctx = canvas.getContext( '2d' );
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            
        }
        
    }
    
    
    var lineCapValues = ['butt', 'round', 'square'],
        lineJoinValues = ['round', 'bevel', 'miter'];
        
    
    function lineTo( destination, ctx ) {
        
        if( !this.x || !this.y ) {
            edward.error( 'lineTo()\'s host object needs an x and y value' );
            return false;
        }
        
        ctx.beginPath();
        ctx.moveTo( this.x, this.y );
        ctx.lineTo( destination.x, destination.y );
        ctx.stroke();
        
        return destination;
        
    }
    
    return {
        clear: clear,
        lineTo: lineTo
    };
    
}());