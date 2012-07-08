var edward = edward || {};

/**
 * Edward touch utils module
 */
edward.touch = (function(){
    
    function capture( element ) {
        
        var touch = new edward.Point();
        
        edward.extend( touch, {
            isPressed: false
        });
        
        
        element.addEventListener( 'touchstart', function( event ) {
            touch.isPressed = true;
        }, false );
        
        
        element.addEventListener( 'touchend', function( event ) {
            touch.isPressed = false;
            touch.x = null;
            touch.y = null;
        }, false );
        
        
        element.addEventListener( 'touchmove' , function( event ) {
            var x,
                y,
                touchEvent = event.touches[0];
                
            if( touchEvent.pageX || touchEvent.pageY ) {
                x = touchEvent.pageX;
                y = touchEvent.pageY;
            } else {
                x = touchEvent.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                y = touchEvent.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            
            x -= element.offsetLeft;
            y -= element.offsetTop;
            
            touch.x = x;
            touch.y = y;
            
        }, false );
        
        return touch;
        
    }
    
    return {
        capture: capture
    };
    
}());