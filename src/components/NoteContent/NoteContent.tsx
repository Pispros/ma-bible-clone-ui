'use client';

import './NoteContent.scss'
import { Box, useMediaQuery, Textarea, Button } from '@chakra-ui/react';
import Header from '@/components/Header/Header';
import Image from 'next/image';
import noteD from '@/assets/icons/active/note.png';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NoteInterface } from '@/interfaces/note.type';
import tagD from '@/assets/icons/active/tag.png';
import undo from '@/assets/icons/undo.png';
import forwardD from '@/assets/icons/forward.png';
import { POST_ACTION, UPDATE_ACTION } from '@/constants/state.conts';

const NoteContentComponent = ({ noteId } : { noteId?: string | string[] | undefined }) => 
{
    const notes: Array<NoteInterface> = useStoreState((state: any) => state?.notes);
    const saveNote = useStoreActions((actions: any) => actions.saveNote);
	const [isForDesktop] = useMediaQuery('(min-width: 990px)');
    const [headerInputValue, setHeaderInputValue] = useState(noteId !== undefined ? 
        notes.find(element => String(element.id) === noteId) 
        : 'Titre de la note'
    );
    const [noteContentValue, setNoteContentValue] = useState('');

    // useEffect(() => {
    //   //postRequest(`${apiUrl}/${endPointsMapping.get('note')['post']}`, payload)
    // }, [headerInputValue, noteContentValue])

    const addNote = async () => {
        const response = saveNote({
            title: headerInputValue,
            content: noteContentValue
        });
        switch (response.state) {
            case POST_ACTION:
                
                break;
            case UPDATE_ACTION:
                
                break;
        
            default:
                break;
        }
    }
    

	const titleIcon = (
        <Image
            src={noteD}
            alt='Title icon'
            style={{width: isForDesktop ? 30 : 40}}
        />
    );
    const titleIcons = (
        <Box
            display="flex"
            flexFlow="row nowrap"
            alignItems="center"
        >
            <svg style={{width: 30, height: 30, cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-vertical</title><path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg>
        </Box>
    );
    const desktopTitleIcons = (
        <>
            <Box
                display="flex"
                flexFlow="row nowrap"
                alignItems="center"
            >
            	<svg style={{width: 30, height: 30, cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-vertical</title><path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg>
            </Box>
        </>        
    );
	return(
		<div className="NoteContentWrapper">
			<Header
                title='Titre de la note'
                titleIcon={titleIcon}
                icons={isForDesktop ? desktopTitleIcons : titleIcons}
                showBorder={true}
				showBack={true}
				returnUrl='/note'
                editableHeader={true}
                editConfiguration={[headerInputValue, setHeaderInputValue]}
            />
            <Box
               height={isForDesktop ? "84vh" : "74vh"}
            >
                <Textarea
                    mt={isForDesktop ? "2" : "3"}
                    ml="1%"
                    resize="none"
                    height={isForDesktop ? "82vh" : "73vh"}
                    width="98%"
                    placeholder='Saisir une note.'
                    border="unset"
                    outline="none"
                    focusBorderColor='white'
                    value={noteContentValue}
                    onChange={(e) => setNoteContentValue(e.target.value)}
                />
            </Box>
            <Box
                height="8vh"
                width="100%"
                display="flex"
                padding="0 30px"
                justifyContent="space-between"
                alignItems="center"
                flexFlow="row nowrap"
                borderBottom={!isForDesktop ? "solid 1px var(--relevant-background)" : "unset"}
                borderTop="solid 1px var(--relevant-background)"
            >
                 <Box
                    width="50px"
                    display="flex"
                    alignItems="center"
                    flexFlow="row nowrap"
                 >
                    <Image
                        src={tagD}
                        alt='tag icon'
                        style={{width: isForDesktop ? 20 : 20}}
                    />
                    &nbsp;
                    1
                 </Box>
                 <Box
                    width="50px"
                    display="flex"
                    alignItems="center"
                    flexFlow="row nowrap"
                 >
                    <Image
                        src={undo}
                        alt='undo icon'
                        style={{width: isForDesktop ? 20 : 20}}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Image
                        src={forwardD}
                        alt='forwardD icon'
                        style={{width: isForDesktop ? 20 : 20}}
                    />
                 </Box>
                 <Box
                    width="50px"
                    display="flex"
                    alignItems="center"
                    flexFlow="row nowrap"
                 >
                    <Button onClick={()=>{addNote()}} backgroundColor="#9747FF" color="white" size='sm'>
                        OK
                    </Button>
                 </Box>
            </Box>
		</div>
	)
}

export default NoteContentComponent