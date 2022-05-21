import React, { useState } from 'react';
import MyEditor from './MyEditor';
import CarListBrowser from './CarListBrowser'
import Unity, { UnityContext } from "react-unity-webgl";

import './App.css';



function App() {

  let [renderEditor, setRenderEditor] = useState(false);


  const unityContext = new UnityContext({
    loaderUrl: "./build/WebGL.loader.js",
    dataUrl: "./build/WebGL.data",
    frameworkUrl: "./build/WebGL.framework.js",
    codeUrl: "./build/WebGL.wasm",
  });

  function resetCarModel() {
    unityContext.send('GameObject', 'CopyFromJSON', '{"wheelColor":"#5C5C5C","paintColor":"#FFFFFF","secondaryPaintColor":"#000001","interior":"Wood","seat":"Cloth","decal":""}')
    unityContext.send('GameObject','ChangeCamera' , 0);
  }

  function changeView(){
    setRenderEditor(!renderEditor);
    //resetCarModel();
    
  }

  return (
    <div>
      <div className="button" onClick={() => {changeView() }}>
        Trocar entre Editor e Manager
      </div>

      <CarListBrowser unityContext={unityContext} shouldRender={renderEditor} />
      <MyEditor unityContext={unityContext} shouldRender={renderEditor} />
      <Unity unityContext={unityContext} className = "unityStyle" />
    </div>

  );
}
export default App;