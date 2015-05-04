class Device{
    static get isPC(){
        return navigator.platform.indexOf('Win32') != -1 ||
            navigator.platform.indexOf('Win64') != -1 ||
            navigator.platform.indexOf('Mac') != -1 ||
            navigator.platform.indexOf('x86_64') != -1;
    }
} 