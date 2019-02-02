export default class CVTab {
    
    constructor() {
        this("Undefined", function() {
            console.error("Clicked an undefined tab");
        });
    }

    constructor(label, onClick) {
        this.label = label;
        this.onClick = onClick;
    }

    constructor(label, onClick, primaryStyle, secondaryStyle, tertiaryStyle) {
        
    }
}