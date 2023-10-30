'use client';

import NoteContentComponent from "@/components/NoteContent/NoteContent"
import { useEffect, useState } from "react";

const EditNote = () => 
{
    const [noteId, setnoteId] = useState('0')
    useEffect(() => {
      setnoteId(
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