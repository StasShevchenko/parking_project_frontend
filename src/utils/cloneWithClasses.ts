import React, {isValidElement} from "react";

export const cloneWithClasses = (element: React.ReactNode, classes: string[]) => {
    if (isValidElement(element)) {
        return React.cloneElement(element, {
            ...element.props,
            className: element.props.className + " " + classes.join(' ')
        });
    } else{
        return element
    }
}