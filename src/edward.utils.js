var edward = edward || {};

edward.utils = (function(){
    
    
    function deg2rad( deg ) {
        return ( deg * Math.PI ) / 180;
    }
    
    
    function rad2deg( rad ) {
        return ( rad * 180 ) / Math.PI;
    }
    
    
    function distanceTo( target ) {
        
        if( !this.x || !this.y || !target.x || !target.y ) {
            return false;
        }
        
        var origin = { x: this.x, y: this.y };
        
        
        return distanceBetween( origin, target );
        
    }
    
    
    function distanceBetween( point1, point2 ) {
        
        if( !point1.x || !point1.y || !point2.x || !point2.y ) {
            return false;
        }
        
        var deltaX = ( point2.x - point1.x ),
            deltaY = ( point2.y - point1.y );
            
        return Math.sqrt( Math.pow( deltaX, 2 ) + Math.pow( deltaY, 2 ) );
        
    }
    
    function setupRequestAnimationFrame() {
        
        if( !window.requestAnimationFrame ) {
            window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( callback ) {
                return window.setTimeout( callback, 1000/60 );
            });
        }
        
    }
    
    
    
    function colorToRGB( color, alpha ) {
        
        //if string format, convert to number
        if( typeof color === 'string' && color[0] === '#' ) {
            color = window.parseInt( color.slice(1), 16 );
        }
        
        alpha = (alpha === undefined) ? 1 : alpha;
        
        //extract component values
        var r = color >> 16 & 0xff,
        g = color >> 8 & 0xff,
        b = color & 0xff,
        a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
        
        //use 'rgba' if needed
        if (a === 1) {
            return "rgb("+ r +","+ g +","+ b +")";
        } else {
            return "rgba("+ r +","+ g +","+ b +","+ a +")";
        }
    }
    
    
    
    function parseColor( color, toNumber ) {

        if( toNumber === true ) {
            if( typeof color === 'number' ) {
                    //chop off decimal
                return (color | 0);
            }

            if (typeof color === 'string' && color[0] === '#') {
                color = color.slice(1);
            }

            return window.parseInt(color, 16);

        } else {
            if (typeof color === 'number') {
                //make sure our hexadecimal number is padded out
                color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
            }
            return color;
        }
    }
    
    
    return {
        deg2rad: deg2rad,
        rad2deg: rad2deg,
        distanceTo: distanceTo,
        distanceBetween: distanceBetween,
        setupRequestAnimationFrame: setupRequestAnimationFrame,
        colorToRGB: colorToRGB,
        parseColor: parseColor,
        clear: clear
    };
    
    
}());