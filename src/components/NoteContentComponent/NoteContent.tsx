'use client';

import './NoteContent.scss'
import { Box, useMediaQuery, Textarea, Button, useToast, Grid } from '@chakra-ui/react';
import Header from '@/components/HeaderComponent/Header';
import Image from 'next/image';
import noteD from '@/assets/icons/active/note.png';
import { useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NoteInterface } from '@/interfaces/note.interface';
import tagD from '@/assets/icons/active/tag.png';
import redTag from '@/assets/icons/red-tag.png';
import undo from '@/assets/icons/undo.png';
import forwardD from '@/assets/icons/forward.png';
import { postRequest, updateRequest } from '@/services/requests.service';
import { endPointsMapping } from '@/constants/endpoints.mapping';
import { apiUrl } from '@/constants/environnement.const';
import { formatDate } from '@/utils/dateTime.helper';
import TagComponent from '@/components/TagComponent/TagComponent';

const NoteContentComponent = ({ noteId } : { noteId?: string }) => 
{
    const toast = useToast();
    const initialHeight = useRef(1);
    const currentHeight = useRef(1);
    const isResizedOnAndroidDevices = useRef(false);
    const alreadyResized = useRef(false);
    const notes: Array<NoteInterface> = useStoreState((state: any) => state?.notes);
    const saveNote   = useStoreActions((actions: any) => actions.saveNote);
    const updateNote = useStoreActions((actions: any) => actions.updateNote);
	const [isForDesktop] = useMediaQuery('(min-width: 990px)');
    const [headerInputValue, setHeaderInputValue] = useState('Titre de la note');
    const [noteContentValue, setNoteContentValue] = useState('');
    const [note, setNote] = useState<NoteInterface>();
    const [isEditing, setIsEditing] = useState(false);
    const [justEdited, setJustEdited] = useState(false);
    const [mobileBoxResizableBox, setMobileBoxResizableBox] = useState(91);
    const [mobileTextAreaBoxResizableBox, setMobileTextAreaBoxResizableBox] = useState(91);

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

    const isIOS = () : boolean => {
        const list = ['iPad', 'iPhone', 'iPod', 'Mac'];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if (element.toLowerCase().includes(String(navigator.platform).toLowerCase())) {
                return true;
            }
        }
        return false;
    }
    
    // This is for when mobile keyboard resizes the viewport
    const onFocusTextArea = (e: any) => {
        // Just to prevent resizing while inspecting with developer tools whithin the browser
        // if (isResizedOnAndroidDevices.current === false) {
        //     return;
        // }
        e.preventDefault();
        if (!isForDesktop && alreadyResized.current === false) {
            alreadyResized.current = true;
            setTimeout(() => {
                currentHeight.current = window.visualViewport?.height || 1;
                const bigContainer = document.getElementById('NoteContentWrapper');                
                setMobileBoxResizableBox(isIOS() ? currentHeight.current/Number(initialHeight.current) * 91 * 1.2 : currentHeight.current/Number(initialHeight.current) * 91 * 1.29);
                setMobileTextAreaBoxResizableBox(isIOS() ? currentHeight.current/Number(initialHeight.current) * 91 * 1.6 : currentHeight.current/Number(initialHeight.current) * 91 * 1.7);
                if (bigContainer) {
                    bigContainer.style.overflow = "hidden"
                } 
           }, 100);
        }
    }

    const onBlurTextArea = () => {
        if (!isForDesktop) {
            currentHeight.current = 1;
            setMobileBoxResizableBox(91);
            setMobileTextAreaBoxResizableBox(91);
            alreadyResized.current = false;
            const bigContainer = document.getElementById('NoteContentWrapper');
            if (bigContainer) {
                bigContainer.style.overflow = "auto"
            }
        }
    }

    useEffect(() => {
        if (noteId) {                        
            const note = notes?.find(element => String(element.id) === noteId);
            setNote(note);
            setHeaderInputValue(note?.title || 'Titre de la note');
            setNoteContentValue(note?.body || '');
        }       
    }, [noteId])

    useEffect(() => {
        initialHeight.current = window.innerHeight;        
        const textAreaInput = document.getElementById('text-content-id');
        if (textAreaInput) {     
            setTimeout(() => {
                textAreaInput.style.height = textAreaInput.scrollHeight + 'px';
            }, 100);                   
        }

        // Just to prevent resizing while inspecting with developer tools whithin the browser
        // window.addEventListener('resize', () => {
        //     const newHeight = window.visualViewport?.height || 1;
        //     currentHeight.current = newHeight;
        //     if (
        //         initialHeight.current !== newHeight &&
        //         newHeight != 1
        //     ) {
        //         isResizedOnAndroidDevices.current = true;
        //     } else {
        //         if (initialHeight.current === newHeight) {
        //             isResizedOnAndroidDevices.current = false;
        //         }
        //     }
        // })
    }, [])
    
    
	return(
		<div className="NoteContentWrapper" id='NoteContentWrapper'>
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
            <Grid
               height={isForDesktop ? "84vh" : mobileBoxResizableBox + '%'}
               templateRows={isForDesktop ? "84vh 8vh" : `${mobileBoxResizableBox + '%'} 8%`}
            >
                <Box>
                    <Textarea
                        translate="no"
                        mt={isForDesktop ? "2" : "1"}
                        ml="1%"
                        resize="none"
                        width="98%"
                        height="fit-content"
                        maxHeight={isForDesktop ? "77vh" : mobileTextAreaBoxResizableBox + '%'}
                        placeholder='Saisir une note.'
                        border="unset"
                        outline="none"
                        focusBorderColor='white'
                        id={`text-content-id`}
                        value={noteContentValue}
                        // Auto rezise textarea while typing. Not very clean but simple & working :)
                        onChange={(e) => {setNoteContentValue(e.target.value); setIsEditing(true); e.target.style.height = (e.target.scrollHeight) + "px"}}
                        onFocus={(e) => {onFocusTextArea(e)}}
                        onBlur={onBlurTextArea}
                    />
                    <Box
                        mt="1"
                        h="5vh"
                        className='tagsContainer'
                    >
                        <TagComponent
                            name='Prière'
                            tag={redTag}
                        />
                    </Box>
                </Box>
                    
                {/*  */}

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
                            style={{width: 20}}
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
            </Grid>
            
		</div>
	)
}

export default NoteContentComponent