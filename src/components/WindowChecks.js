const Dimensions = require('Dimensions');

export function isOld() {
    let window = Dimensions.get('window');
    console.log('wind',window)
    return (window.height * window.scale) < 1300;
}
    
export function iPhone5() {
    let window = Dimensions.get('window');
    console.log('otha one,', window);
    return (window.height * window.scale) < 1300;
}
    
export function fontSize() {
        if (isOld()) {
            return 28;
        } else if (iPhone5()) {
            return 32;
        } else {
            return 44;
        }
}
        
export function marginTop() {
        if (isOld()) {
            return 120;
        } else if (iPhone5()) {
            return 60;
        } else {
            return 95;
        }
}
    
export function buttonWidth() {
    if (isOld()) {
        return 150;
    } else if(iPhone5()) {
        return 160;
    } else {
        return 240;
    }
}
    
export function getFormWidth() {
    if (isOld()) {
        return 300;
    } else if(iPhone5()) {
        return 320;
    } else {
        return 358;
    }
}
    
export function getImageProp() {
    if (isOld()) {
        return 140;
    } else if(iPhone5()) {
        return 250;
    } else {
        return 300;
    }
}
    
    export function getButtonMargin() {
        if (isOld()) {
            return 200;
        } else if (iPhone5()) {
            return 250;
        } else {
            return 340;
        }
    }
        
export function getButtonLeftMargin() {
    if (isOld()) {
        return 80;
    } else if (iPhone5()) {
        return 60;
    } else {
        return 90;
    }
}