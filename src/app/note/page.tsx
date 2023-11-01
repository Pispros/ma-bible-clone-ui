'use client';

import { Box, Text, useMediaQuery, InputGroup, InputLeftElement, Input, SkeletonText } from '@chakra-ui/react';
import './styles.scss';
import Header from '@/components/HeaderComponent/Header';
import noteD from '@/assets/icons/active/note.png';
import add from '@/assets/icons/add.png';
import folderOutline from '@/assets/icons/folder-outline.png';
import empty from '@/assets/img/empty.png';
import Image from 'next/image';
import { SearchIcon } from '@chakra-ui/icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NoteInterface } from '@/interfaces/note.interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRequest } from '@/services/requests.service';
import { apiUrl } from '@/constants/environnement.const';
import { endPointsMapping } from '@/constants/endpoints.mapping';
import dynamic from 'next/dynamic';
import NoteListComponent from '@/components/NoteListComponent/NoteListComponent';



const NotePage = () => {
    const mockSkeleton = [{},{},{},{},{},{},{},{},{},{},{},{}];
    const router = useRouter();
    const [isForDesktop] = useMediaQuery('(min-width: 990px)');
    const notes: Array<NoteInterface> = useStoreState((state: any) => state?.notes);
    const [isLoading, setisLoading] = useState(false);
    const [search, setSearch] = useState('');
    const saveMultipleNotes = useStoreActions((actions: any) => actions.saveMultipleNotes);
    const setSearchValue = useStoreActions((actions: any) => actions.setSearchValue);

    const titleIcon = (
        <Image
            src={noteD}
            alt='Title icon'
        />
    );
    const titleIcons = (
        <Box
            display="flex"
            flexFlow="row nowrap"
            alignItems="center"
        >
            <SearchIcon boxSize={5} />
            <Box
                ml="4"
                padding="2"
                backgroundColor={"var(--item-background)"}
                borderRadius="50%"
                width="40px"
                height="40px" 
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() =>{ router.push('/note/new') }}
            >
                <Image
                    src={add}
                    alt="Add Icon"
                />
            </Box>
        </Box>
    );
    const desktopTitleIcons = (
        <>
            <Box
                display="flex"
                flexFlow="row nowrap"
                alignItems="center"
            >
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='var(--divider-desktop-color-background)' />
                    </InputLeftElement>
                    <Input 
                        backgroundColor="var(--item-background)" 
                        type='text' 
                        placeholder='Rechercher'
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value); setSearchValue(e.target.value)}}
                    />
                </InputGroup>
            </Box>
            <Box
                className='shadow'
                position="fixed"
                bottom="5"
                right="20%"
                padding="3"
                backgroundColor="var(--body-background)"
                fontWeight="bold"
                borderRadius="50%"
                width="43px"
                height="43px" 
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                onClick={() =>{ router.push('/note/new') }}
            >
                <Image
                    src={add}
                    alt="Add Icon"
                />
            </Box>
        </>        
    );
    useEffect(() => {      
      if (notes === undefined || notes?.length === 0) {
        setisLoading(true);
        getRequest(`${apiUrl}/${endPointsMapping.get('note')['get']}`)
        .then((response: any) => {
            const temp: Array<NoteInterface> = [];
            for (let index = 0; index < 3; index++) {
                response.data[index].createdAt = new Date().toISOString();                        
                temp.push(response.data[index])
            }
            // Just to see nice skeleton :)
            setTimeout(() => {
                saveMultipleNotes(temp);
                setisLoading(false);
            }, 1000);      
        })
      }      
    }, [])
    
    return (
        <Box className='noteWrapper'>
            <Header
                title='Notes'
                titleIcon={titleIcon}
                icons={isForDesktop ? desktopTitleIcons : titleIcons}
                showBorder={isForDesktop}
            />
            {
                isLoading &&
                <>
                    {
                        mockSkeleton?.map((item, index) => (
                            <Box key={`skeleton-${index}`} padding='6' boxShadow='lg' bg='white'>
                                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                            </Box>
                       ))
                    }
                </>
            }
            {
                !isLoading && notes?.length > 0 ?
                <>
                    {
                       window !== undefined &&
                       <>
                            <Box
                                display="flex"
                                flexFlow="row nowrap"
                                alignItems="center"
                                borderBottom="solid 1px var(--relevant-background)"
                                pl="7"
                                pt="2"
                                pb="2"
                            >
                                <Image
                                    src={folderOutline}
                                    alt="Folder Icon"
                                />
                                <Text
                                    ml="2"
                                >
                                    Archivée(s)
                                </Text>                                
                                <Box
                                    ml="2"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="50%"
                                    w="20px"
                                    h="20px"
                                    backgroundColor="var(--relevant-background)"
                                >
                                    1
                                </Box>
                            </Box>
                            {
                                [...notes]?.reverse().map(note => (
                                    <NoteListComponent
                                        note={note}
                                        key={"note" + note.id}
                                        isForDesktop={isForDesktop}
                                        searchValue={search}
                                    />
                                ))
                            } 
                       </>
                    }
                </>
                :
                <>
                    <Box 
                        height="40vh"
                        display="flex"
                        flexFlow="column"
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Image
                            src={empty}
                            alt="Empty notes"
                        />
                        <br />
                        <Text textAlign="center" color="var(--text-second-color)">
                            Aucune note rédigée <br /> pour le moment
                        </Text>
                    </Box>
                </>
            }
        </Box>
    );
}

export default NotePage;