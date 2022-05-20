import React from 'react';
import './App.css';
import MyEditor from './MyEditor';
import Unity, { UnityContext } from "react-unity-webgl";



function App() {

  const unityContext = new UnityContext({
    loaderUrl: "./build/WebGL.loader.js",
    dataUrl: "./build/WebGL.data",
    frameworkUrl: "./build/WebGL.framework.js",
    codeUrl: "./build/WebGL.wasm",
  });

  const unityStyle = {
    height: 600,
    width: 960,
    border: "2px solid black",
    background: "grey",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",

  };

  function resetCarModel(){
    unityContext.send('gameObject', 'copyFromJson', '{"wheelColor":"#5C5C5C","paintColor":"#FFFFFF","secondaryPaintColor":"#000001","interior":"Wood","seat":"Cloth","decal":""}')
    
  }


  return (
    <div>
      <carListManager/>
      <MyEditor unityContext={unityContext} shouldRender = {true} />
      <Unity unityContext={unityContext} style={unityStyle} />
    </div>

  );
}
export default App;