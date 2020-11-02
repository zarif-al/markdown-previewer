import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'
import { faExpand, faCompress} from '@fortawesome/free-solid-svg-icons'
import marked from 'marked'
import primaryContent from './primaryContent';
import './App.css';


function App() {
  const [editorWrap, setEditorWrap] = useState('editorWrap');
  const [render, setRender] = useState('render')
  const [displayMaxBtn, setDisplayMax] = useState('inline');
  const [displayMinBtn, setDisplayMin] = useState('none');
  const [edtorContent, setContent] = useState(primaryContent);
  const [displayEditor, setDisplayEditor] = useState('flex');
  const [displayPreview, setDisplayPreview] = useState('flex');

  marked.setOptions({
    breaks : true,
  })

  const Resize = (num) => {
  if(num === 1){
    setEditorWrap('editorWrap-maximize');
    setDisplayMin('inline');
    setDisplayMax('none');
    setDisplayPreview('none');
  }
  if(num === 2){
    setEditorWrap('editorWrap');
    setDisplayMin('none');
    setDisplayMax('inline');
    setDisplayPreview('flex');
  }
  if(num === 3){
    setRender('render-maximize');
    setDisplayMin('inline');
    setDisplayMax('none');
    setDisplayEditor('none');
  }
  if(num === 4){
    setRender('render');
    setDisplayMin('none');
    setDisplayMax('inline');
    setDisplayEditor('flex');
  }
  }

  return (
    <div className="App">
      <div className={editorWrap} style={{display : displayEditor}}>
          <div className="toolbar">
            <div class="toolbarHeading">
            <FontAwesomeIcon icon={faFreeCodeCamp}></FontAwesomeIcon>Editor
            </div>
            <FontAwesomeIcon icon={faExpand} onClick={()=>{Resize(1)}} style={{display : displayMaxBtn}}></FontAwesomeIcon>    
            <FontAwesomeIcon icon={faCompress} onClick={()=>{Resize(2)}} style={{display : displayMinBtn}}></FontAwesomeIcon>
          </div>
          <textarea id="editor" type="text" value={edtorContent}  onChange={(e)=>{setContent(e.target.value)}}>
          </textarea>
      </div>
      <div className={render} style={{display : displayPreview}}>
            <div className="toolbar"><div class="toolbarHeading">
            <FontAwesomeIcon icon={faFreeCodeCamp}></FontAwesomeIcon>Markdown Previewer
            </div>
            <FontAwesomeIcon icon={faExpand} onClick={()=>{Resize(3)}} style={{display : displayMaxBtn}}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faCompress} onClick={()=>{Resize(4)}} style={{display : displayMinBtn}}></FontAwesomeIcon>
          </div>
        <div className="preview" id="preview" dangerouslySetInnerHTML={{__html: marked(edtorContent)}}></div>   
      </div>
    </div>
  );
}

export default App;
