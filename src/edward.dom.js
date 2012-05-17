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