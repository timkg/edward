var edward = (function() {
    
    
    var version = '0.1.0',
        errorLog = [],
        messageLog = [],
        throwErrors = true;
    
    
    function extend( obj, extension ) {
        obj = obj || {};
        extension = extension || {};
            
        for( var prop in extension ) {
            obj[prop] = extension[prop];
        }
        
    }
    
    
    
    function toString() {
        return 'Edward v' + version;
    }
    
    
    
    function noErrors() {
        
        edward.throwErrors = false;
        
    }
    
    
    function error( message ) {
        
        if( edward.throwErrors ) {
            throw( message );
        } else {
            edward.errorLog.push( message );
        }
        
    }
    
    
    function log( message ) {
        if( typeof window.console !== undefined ) {
            window.console.log( message );
        } else {
            edward.messageLog.push( message );
        }
    }
    
    return {
        version: version,
        errorLog: errorLog,
        throwErrors: throwErrors,
        extend: extend,
        toString: toString,
        noErrors: noErrors,
        error: error,
        log: log
    };
    
    
}());
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
 
 
    // from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
    
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    
    
    return {
        deg2rad: deg2rad,
        rad2deg: rad2deg,
        distanceTo: distanceTo,
        distanceBetween: distanceBetween,
        setupRequestAnimationFrame: setupRequestAnimationFrame,
        colorToRGB: colorToRGB,
        parseColor: parseColor,
        guidGenerator: guidGenerator
    };
    
    
}());
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
var edward = edward || {};

/**
 * Edward event/pubsub module
 * Heavily based on 
 *     http://www.addyosmani.com/resources/essentialjsdesignpatterns/book
 *     
 * TODO: unsubscribe without depending on specific subscribe tokens
 * 
 */
edward.event = (function(){
    
    var topics = {},
        subUid = 0;
    
    
    function publish( topic, args ) {
        
        if( !topics[topic] ) {
            return false;
        }
        
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        
        
        while( len-- ) {
            subscribers[len].func( topic, args );
        }
        
        return this;
        
    }
    
    
    
    function subscribe( topic, func ) {
        
        if( !topics[topic] ) {
            topics[topic] = [];
        }
        
        var token = ( subUid++ ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        
        return token;
        
    }
    
    
    function unsubscribe( token ) {
        
        for( var m in topics ) {
            if( topics[m] ) {
                for( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    }
    
    
    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
    
}());
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
var edward = edward || {};

edward.trig = (function(){
    
    var deg2rad = edward.utils.deg2rad,
        rad2deg = edward.utils.rad2deg;
    
    
    function sin( angleInDegrees ) {
        return Math.sin( deg2rad( angleInDegrees ) );
    }
    
    
    function cos( angleInDegrees ) {
        return Math.cos( deg2rad( angleInDegrees ) );
    }
    
    
    function tan( angleInDegrees ) {
        return Math.tan( deg2rad( angleInDegrees ) );
    }
    
    
    function asin( ratio ) {
        return rad2deg( Math.asin( ratio ) );
    }
    
    
    function acos( ratio ) {
        return rad2deg( Math.acos( ratio ) );
    }
    
    function atan( ratio ) {
        return rad2deg( Math.atan( ratio ) );
    }
    
    function atan2( point ) {
        return rad2deg( Math.atan2( point.y, point.x ) );
    }

    
    return {
        sin: sin,
        cos: cos,
        tan: tan,
        asin: asin,
        acos: acos,
        atan: atan,
        atan2: atan2
    };
    
}());
var edward = edward || {};

edward.dom = (function() {
    
    
    function isDomNode( node ) {
        
        // based on mootools
        if( node.nodeName ){
            switch( node.nodeType ) {
            case 1: return 'element';
            case 3: return (/\S/).test(node.nodeValue) ? 'textnode' : 'whitespace';
            }
        } else {
            return false;
        }
    }
    
    return {
        isDomNode: isDomNode
    };
    
}());
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
var edward = edward || {};

edward.rotation = (function(){
    
    
    function getRotationTo( point ) {
        
        return edward.trig.atan2( point );
        
    }
    
    return {
        getRotationTo: getRotationTo
    };
    
}());
var edward = edward || {};

/***
 * 
 */
edward.Oscillator = (function(){
    
    function Oscillator( _opts ) {
        
        var opts = _opts || {},
        _params = {
            'target': true,
            'start': true,
            'function': true,
            'increment': true,
            'range': true
        };

        for( var p in _params ) {
            if( !( p in opts ) ) {
                edward.error( 'Oscillator requires argument ' + p );
                return false;
            }
        }


        edward.extend( this, opts );

        this.id = edward.utils.guidGenerator();

        // set @target to @start-value
        this[opts['target']] = opts.start;

        // set @angle to @increment
        this.angle = opts.increment;

        // called at every TICK event
        this.pulse = function Oscillator_Pulse( ) {

            // set target to start value + ( range * func(angle) )
            this[opts['target']] = opts.start + ( opts.range * opts['function'].call( this, this.angle ) );
            
            this.angle += opts.increment;
            if( this.angle > 360 ) {
                this.angle = this.angle % 360;
            }
            
            edward.event.publish( this.id, this[opts['target']] );
            
//            edward.log( this.id + ' updated to ' + this[opts['target']] );
        };
        
        edward.event.subscribe( 'tick', this.pulse.bind( this ) );
        
    }
    
    
    return Oscillator;
    
}());