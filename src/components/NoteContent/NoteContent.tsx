'use client';

import './NoteContent.scss'
import { Box, useMediaQuery, Textarea, Button, useToast } from '@chakra-ui/react';
import Header from '@/components/Header/Header';
import Image from 'next/image';
import noteD from '@/assets/icons/active/note.png';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NoteInterface } from '@/interfaces/note.interface';
import tagD from '@/assets/icons/active/tag.png';
import undo from '@/assets/icons/undo.png';
import forwardD from '@/assets/icons/forward.png';
import { postRequest, updateRequest } from '@/services/requests.service';
import { endPointsMapping } from '@/constants/endpoints.mapping';
import { apiUrl } from '@/constants/environnement.const';
import { formatDate } from '@/utils/dateTime.helper';

const NoteContentComponent = ({ noteId } : { noteId?: string }) => 
{
    const toast = useToast();
    const notes: Array<NoteInterface> = useStoreState((state: any) => state?.notes);
    const saveNote   = useStoreActions((actions: any) => actions.saveNote);
    const updateNote = useStoreActions((actions: any) => actions.updateNote);
	const [isForDesktop] = useMediaQuery('(min-width: 990px)');
    const [headerInputValue, setHeaderInputValue] = useState('Titre de la note');
    const [noteContentValue, setNoteContentValue] = useState('');
    const [note, setNote] = useState<NoteInterface>();
    const [isEditing, setIsEditing] = useState(false);
    const [justEdited, setJustEdited] = useState(false);
    
    const formatedDate = () : string => {
		if (note?.updatedAt) {
			return formatDate(new Date(note?.updatedAt));
		}
		return formatDate(new Date(String(note?.createdAt)));
	}

    const addOrUpdateNote = async () => {
        let payload = {
            title: headerInputValue,
            body: noteContentValue
        }
        try {
            if (note) {
                updateNote({
                    id: Number(note.id),
                    ...payload
                })
                setIsEditing(false);
                setJustEdited(true);
                await updateRequest(`${apiUrl}/${endPointsMapping.get('note')['put']}`, payload);
                toast({
                    title: "Bravo!",
                    status: "success",
                    description: "Votre note a été mise à jour avec sucès!"
                });
            } else {
                const response = saveNote(payload);
                setNote(response?.payload);
                setIsEditing(false);
                setJustEdited(true);              
                await postRequest(`${apiUrl}/${endPointsMapping.get('note')['post']}`, payload);
                toast({
                    title: "Bravo!",
                    status: "success",
                    description: "Votre note a été mise à jour avec sucès!"
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Oops",
                status: "error",
                description: "Quelque chose s'est mal passé, veuillez reéssayer plus tard."
            });
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

    useEffect(() => {
        if (noteId) {                        
            const note = notes?.find(element => String(element.id) === noteId);
            setNote(note);
            setHeaderInputValue(note?.title || 'Titre de la note');
            setNoteContentValue(note?.body || '');
        }       
    }, [noteId])  
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
                setIsEditing={setIsEditing}
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
                    onFocus={()=>{setIsEditing(true)}}
                />
                <Box
                    className='tagsContainer'
                >

                </Box>
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
                 {
                    (isEditing || note === undefined) ? 
                    <>
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
                            <Button onClick={()=>{addOrUpdateNote()}} backgroundColor="var(--primary-color)" color="white" size='sm'>
                                OK
                            </Button>
                        </Box>
                    </>
                    :
                    <>
                        <Box>
                            Modifié : {
                                justEdited ? "A l'instant"
                                :
                                formatedDate()
                            }
                        </Box>
                    </>
                 }
            </Box>
		</div>
	)
}

export default NoteContentComponent