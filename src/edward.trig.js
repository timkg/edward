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