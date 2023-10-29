'use client';

import { Box, Input } from '@chakra-ui/react';
import './Header.scss';
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation';


const Header = ({ title, titleIcon,  icons, showBack, showBorder, returnUrl, editableHeader, editConfiguration } : { 
	title?: string;  
	titleIcon?: React.ReactNode;
	icons?: React.ReactNode; 
	showBack?: boolean,
	showBorder?: boolean,
	editableHeader?: boolean,
	returnUrl?: string;
	editConfiguration?: any
})  => 
{
	const router = useRouter();
	return(
		<div className="HeaderWrapper">
			<Box
				display="flex"
				flexFlow="row nowrap"
				justifyContent="space-between"
				alignItems="center"
				padding="10px 20px 10px 10px"
				width="100%"
				height="7vh"
				borderBottom={showBorder ? "solid 1px var(--relevant-background)" : "unset"}
			>
				<Box
					display="flex"
					flexFlow="row nowrap"
					alignItems="center"
				>
					{
						showBack === true &&
						<Box
							ml="3"
							cursor="pointer"
							onClick={() => {router.push(String(returnUrl))}}
						>
							<ChevronLeftIcon boxSize={8}/>
						</Box>
					}					
					<Box
						ml="3"
					>
						{ titleIcon }
					</Box>
					{
						!editableHeader &&
						<Box
						fontWeight="bold"
						fontSize="xl"
						ml="2"
						>
							{ title }
						</Box> 
					}
				</Box>
				{
					editableHeader ?
					<>
						<Input
							value={editConfiguration[0]}
							onChange={(e) => editConfiguration[1](e.target.value)}
							w="95%"
							ml="2"
							h="4vh"
						/>
					</>
					:
					<>
						<Box>
							{ icons }
						</Box>
					</>
				}				
			</Box>
		</div>
	)
}

export default Header