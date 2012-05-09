var edward = edward || {};

/**
 * Edward mouse utils module
 * Attaches an event handler to mousemove over a
 *     specified element (a canvas element, for example)
 *     and keeps track of the mouse position over the element
 *     
 * See examples/edward.mouse.html for usage
 * 
 */
edward.mouse = (function(){
    
    function capture( element ) {
        
        var mouse = new edward.Point();
        
        element.addEventListener( 'mousemove', function( event ) {
            
            var x, y;
            if( event.pageX || event.pageY ) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            
            x -= element.offsetLeft;
            y -= element.offsetTop;
            
            mouse.x = x;
            mouse.y = y;
            
        }, false );
        
        return mouse;
        
    }
    
    return {
        capture: capture
    };
    
}());