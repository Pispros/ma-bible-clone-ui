'use client';

import NoteContentComponent from "@/components/NoteContentComponent/NoteContent"
import { useEffect, useState } from "react";

const EditNote = () => 
{
    const [noteId, setNoteId] = useState('0')
    useEffect(() => {
      setNoteId(
        previous => { return window.location.href.split('/')[ window.location.href.split('/').length - 1] }
      )
    }, [])
        
	return(
		<NoteContentComponent
      noteId={noteId}
    />
	)
}

export default EditNote