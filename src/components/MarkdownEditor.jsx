import React, {useState, useCallback, useMemo} from 'react';
import {SimpleMdeReact} from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const MarkdownEditor = (props) => {
    const [value, setValue] = useState("Initial value");
  
    const onChange = useCallback((value) => {
      setValue(value);
    }, []);
    const NoSpellcheckerOptions = useMemo(() => {
      return {
        spellChecker: false,
      };
    }, []);
  
    return <SimpleMdeReact options={NoSpellcheckerOptions} onChange={props.onChange} />;
  };

export default MarkdownEditor;
