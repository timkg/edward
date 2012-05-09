var edward = (function() {
    
    
    var version = '0.1.0';
    
    
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
    
    
    return {
        version: version,
        extend: extend,
        toString: toString
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
    
    
    return {
        deg2rad: deg2rad,
        rad2deg: rad2deg,
        distanceTo: distanceTo,
        distanceBetween: distanceBetween
    };
    
    
}());
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