# AliX

ALiX is a flexible catalog portal based on Aladin Lite. It it designed to use an interactive sky view as a primary selection tool. The ALiX view is constantly updated with data queried in the host database. It offers advanced functionalities allowing to mix local data with VO data. Users can plot by hand areas of interest and manage an historic of the views.  ALiX has no dependency with any specific data source; it can be integrated in any existing portal. 

## Embedding ALix in your database portal
* Import js
- [x] aladin.js
- [x] aladinliteX.js (js_bundle1)
- [x] alix_import.js (js_bundle2)

* Import css
- [x] aladin.css
- [x] aladinliteX.css
- [x] alix_import.css (style_bundle)


* Create an HTML div to host Alix
```html
// define the size of ALiX in style
<div id="aladin-lite-div" style="width:415px;height:415px;padding:5px;"></div>
```
* Insert ALiX with default config
```javascript
$.ready(
configureALiX({
//your configuration 
})
);
```
## Connecting ALix to your database

```javascript
x = e+f;
```
* Get more in the [wiki](https://github.com/lmichel/alix/wiki)
* Try our live [demo](http://saada.unistra.fr/alix) 
