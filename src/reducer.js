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

 export default reducer;