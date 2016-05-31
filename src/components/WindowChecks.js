const Dimensions = require('Dimensions');

function isOld() {
    let window = Dimensions.get('window');
    console.log('wind',window)
    return (window.height * window.scale) < 1300;
}
    
function iPhone5() {
    let window = Dimensions.get('window');
    console.log('otha one,', window);
    return (window.height * window.scale) < 1300;
}

function iPhone6s() {
    let window = Dimensions.get('window');
    console.log(window,'in iphone6')
    return (window.height* window.scale) > 1920
}


export function marginNeeded() {
    if (iPhone6s()) {
        return 10;
    } else {
        return 1;
    }
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
        return 170;
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
        return 85;
    } else if (iPhone5()) {
        return 86;
    } else  if (iPhone6s()){
        return 90;
    } else {
        return 65;
    }
}