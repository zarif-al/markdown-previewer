import {useReducer} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'
import { faExpand, faCompress} from '@fortawesome/free-solid-svg-icons'
import marked from 'marked'
import primaryContent from './primaryContent';
import './App.css';

 const reducer = (state, action) => {

   if(action.type === 'maxEditor'){
     return {
       ...state, 
       displayMaxBtnState : 'none', 
       displayMinBtnState : 'inline', 
       editorWrapState : 'editorWrap-maximize',
       displayPreviewState : 'none'
      }
   }
   
   if(action.type === 'minEditor'){
      return {
        ...state,
        displayMaxBtnState : 'inline', 
        displayMinBtnState : 'none', 
        editorWrapState : 'editorWrap',
        displayPreviewState : 'flex'
      }
   }
   
   if(action.type === 'updatePreview'){
     return {
       ...state,
       editorContent : action.param
     }
   }
   
   if(action.type === 'maxRender'){
     return {
        ...state, 
        renderState : 'render-maximize',
        displayEditorState : 'none',
        displayMaxBtnState : 'none', 
        displayMinBtnState : 'inline', 
      }
   }
   
   if(action.type === 'minRender'){
      return {
        ...state, 
        renderState : 'render',
        displayEditorState : 'flex',
        displayMaxBtnState : 'inline', 
        displayMinBtnState : 'none', 
      }
   }


   throw new Error('No action received')


 };

  const defaultState = {
    editorWrapState : 'editorWrap',
    displayMinBtnState : 'none',
    displayMaxBtnState : 'inline',
    editorContent : primaryContent,
    displayEditorState : 'flex',
    displayPreviewState : 'flex',
    renderState : 'render'
  };

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  marked.setOptions({
    breaks : true,
  })

  return (
    <div className="App">
      <div className={state.editorWrapState} style={{display : state.displayEditorState}}>
          <div className="toolbar">
            <div className="toolbarHeading">
            <FontAwesomeIcon icon={faFreeCodeCamp}></FontAwesomeIcon>Editor
            </div>
            <FontAwesomeIcon icon={faExpand} onClick={ ()=>{dispatch({type : 'maxEditor'})} } style={{display : state.displayMaxBtnState}}></FontAwesomeIcon>    
            <FontAwesomeIcon icon={faCompress}  onClick={ ()=>{dispatch({type : 'minEditor'})} }  style={{display : state.displayMinBtnState}}></FontAwesomeIcon>
          </div>
          <textarea id="editor" type="text" value={state.editorContent}   onChange={ (e)=>{ dispatch({type : 'updatePreview', param : e.target.value}) } } >
          </textarea>
      </div>
      <div className={state.renderState} style={{display : state.displayPreviewState}}>
            <div className="toolbar"><div className="toolbarHeading">
            <FontAwesomeIcon icon={faFreeCodeCamp}></FontAwesomeIcon>Markdown Previewer
            </div>
            <FontAwesomeIcon icon={faExpand}  onClick={ ()=>{dispatch({type : 'maxRender'})} }  style={{display : state.displayMaxBtnState}}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faCompress}  onClick={ ()=>{dispatch({type : 'min'})} }  style={{display : state.displayMinBtnState}}></FontAwesomeIcon>
          </div>
        <div className="preview" id="preview" dangerouslySetInnerHTML={{__html: marked(state.editorContent)}}></div>   
      </div>
    </div>
  );
}

export default App;
