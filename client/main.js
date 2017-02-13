import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "project-form input[type='button']": {
        "background": "inherit",
        "color": "#50d550",
        "fontSize": "125%",
        "cursor": "pointer"
    },
    "project-form input[type='submit']": {
        "background": "inherit",
        "color": "#50d550",
        "fontSize": "125%",
        "cursor": "pointer"
    },
    "html": {
        "width": "100%",
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "body": {
        "width": "100%",
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontFamily": "ubuntu"
    },
    "li": {
        "listStyle": "none"
    },
    "a": {
        "textDecoration": "none"
    },
    "table": {
        "paddingTop": 0.2,
        "paddingRight": 0.2,
        "paddingBottom": 0.2,
        "paddingLeft": 0.2,
        "border": "0.1rem solid #50d550"
    },
    "table tr": {
        "display": "block",
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "marginTop": 0.2,
        "marginRight": 0.2,
        "marginBottom": 0.2,
        "marginLeft": 0.2,
        "Border": "0.1rem solid #50d550"
    },
    "table td": {
        "width": 8,
        "display": "inline-block",
        "textAlign": "center",
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5
    },
    "table th": {
        "width": 8,
        "display": "inline-block",
        "textAlign": "center",
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5
    },
    "header": {
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
        "background": "#50d550",
        "height": 5
    },
    "logo": {
        "marginLeft": 1
    },
    "main-navigation": {
        "display": "flex",
        "fontSize": 1.2,
        "marginRight": 1,
        "cursor": "pointer"
    },
    "main-navigation li": {
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5
    },
    "display-project-page": {
        "width": "80%",
        "marginTop": 1,
        "marginRight": "auto",
        "marginBottom": 1,
        "marginLeft": "auto"
    },
    "project-form": {
        "width": "100%"
    },
    "project-form-wrapper": {
        "width": "30%",
        "marginTop": 2,
        "marginRight": "auto",
        "marginBottom": 2,
        "marginLeft": "auto"
    },
    "project-form input": {
        "border": "0.15rem solid #50d550",
        "borderRadius": 0.5,
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "marginTop": 0.5,
        "marginRight": 0.5,
        "marginBottom": 0.5,
        "marginLeft": 0.5,
        "width": "100%"
    },
    "project-form textarea": {
        "border": "0.15rem solid #50d550",
        "borderRadius": 0.5,
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "marginTop": 0.5,
        "marginRight": 0.5,
        "marginBottom": 0.5,
        "marginLeft": 0.5,
        "width": "100%"
    },
    "project-form select": {
        "border": "0.15rem solid #50d550",
        "borderRadius": 0.5,
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "marginTop": 0.5,
        "marginRight": 0.5,
        "marginBottom": 0.5,
        "marginLeft": 0.5,
        "width": "100%",
        "background": "inherit"
    },
    "form-elem-wrapper": {
        "marginTop": 0.5,
        "marginRight": 0.5,
        "marginBottom": 0.5,
        "marginLeft": 0.5,
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5
    },
    "project-display-wrapper": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "charts": {
        "width": "60%",
        "marginTop": 5,
        "marginRight": "auto",
        "marginBottom": 5,
        "marginLeft": "auto",
        "Border": ".1rem solid gray"
    },
    "uil-ring-css": {
        "background": "none",
        "position": "relative",
        "width": 200,
        "height": 200
    },
    "uil-ring-css > div": {
        "position": "absolute",
        "display": "block",
        "width": 160,
        "height": 160,
        "top": 20,
        "left": 20,
        "borderRadius": 80,
        "boxShadow": "0 6px 0 0 #59ebff",
        "MsAnimation": "uil-ring-anim 1s linear infinite",
        "MozAnimation": "uil-ring-anim 1s linear infinite",
        "WebkitAnimation": "uil-ring-anim 1s linear infinite",
        "OAnimation": "uil-ring-anim 1s linear infinite",
        "animation": "uil-ring-anim 1s linear infinite"
    }
});