
import './NoteListComponent.scss'
import { NoteInterface } from '@/interfaces/note.interface'
import { formatDate } from '@/utils/dateTime.helper'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	Box, 
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'
import { useStoreActions } from 'easy-peasy'


const NoteListComponent = ({ note, isForDesktop }: { note: NoteInterface; isForDesktop: boolean }) => 
{
	const router = useRouter();
	const toast = useToast();
	const [displayOptionsOnHover, setDisplayOptionsOnHover] = useState(false);
	const [isconfirmModalOpen, setIsconfirmModalOpen] = useState(false);
	const removeNote = useStoreActions((actions: any) => actions.removeNote);

	const formatedDate = () : string => {
		if (note.updatedAt) {
			return formatDate(new Date(note.updatedAt));
		}
		return formatDate(new Date(note.createdAt));
	}

	const confirmDelete = () => {
		removeNote(note);
		setIsconfirmModalOpen(false);
		toast({
			title: "Bravo!",
			status: 'success',
			description: "La note a été retirée avec succès",
		});
	}

	return(
		<div className="NoteListComponentWrapper">
			<Modal isOpen={isconfirmModalOpen} onClose={() => {setIsconfirmModalOpen(false);}}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Êtes-vous sur de vouloir supprimer la note ?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box
						w="100%"
						display="flex"
						flexFlow="row nowrap"
						alignItems="center"
						justifyContent="center"
					>
						<Button 
							size="xl"
							padding="3"
							onClick={confirmDelete}
							colorScheme='green'
						>
							OUI
						</Button>
						<Button 
							size="xl"
							padding="3"
							ml="3"
							colorScheme='red'
							onClick={()=>{setIsconfirmModalOpen(false);}}
						>
							NON
						</Button>
					</Box>
				</ModalBody>

			</ModalContent>
			</Modal>
			<Box 
				key={note.id}
				display="flex"
				flexFlow="row nowrap"
				width="100%"
				borderBottom="solid 1px var(--relevant-background)"
				cursor="pointer"
				onMouseOver={()=>{setDisplayOptionsOnHover(true)}}
				onMouseLeave={()=>{setDisplayOptionsOnHover(false)}}
			>
				<Box
					display="flex"
					flexFlow="column"
					alignItems="flex-start"
					padding="7"
					w={isForDesktop ? "90%" : "80%"}
					onClick={()=>{ router.push(`/note/edit/${note.id}`) }}
				>
					<Text
						mb="3"
						fontSize="xl"
						fontWeight="bold"
					>
						{
							note.title
						}
					</Text>
					<Text
						fontSize="sm"
					>
						{
							note.body
						}
					</Text>					
				</Box>
				<Box
					display="flex"
					flexFlow="row nowrap"
					alignItems="flex-start"
					justifyContent="flex-end"
					padding="7"
					w={isForDesktop ? "10%" : "20%"}
				>
					<Text
						color="var(--divider-desktop-color-background)"
						mt="1"
					>
						{
							formatedDate()
						}
					</Text>
					{
						(!isForDesktop || displayOptionsOnHover) &&
						<>
							<Popover>
								<PopoverTrigger>
									<Box
										padding={isForDesktop ? "2px" : "0"}
										ml={isForDesktop ? "2" : "0"}
										backgroundColor={isForDesktop ? "var(--relevant-background)" : "var(--body-background)"}
										borderRadius="50%"
									>
										<svg style={{width: 30, height: 30, cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-vertical</title><path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg>
									</Box>
								</PopoverTrigger>
								<PopoverContent
									w="225px"
									display="flex"
									flexFlow="column"
									padding="3"
									justifyContent="center"
									borderRadius="xl"
									marginRight="5"
								>
									<Box
										display="flex"
										flexFlow="row nowrap"
										alignItems="center"
										onClick={()=>{setIsconfirmModalOpen(true);}}
									>
										<DeleteIcon boxSize="5" />&nbsp;
										<Text>
											Supprimer
										</Text>
									</Box>
								</PopoverContent>
							</Popover>
						</>
					}
				</Box>
			</Box>
		</div>
	)
}

export default NoteListComponent