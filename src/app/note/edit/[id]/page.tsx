"use client";

import NoteContentComponent from "@/components/NoteContentComponent/NoteContent"
import { FC } from "react";

interface pageProps {
  params: { id: string }
}

const EditNote : FC<pageProps> = ({params}) => 
{        
	return(
		<NoteContentComponent
      noteId={params.id}
    />
	)
}

export default EditNote