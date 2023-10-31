'use client';
import Image from 'next/image';
import './TagComponent.scss'
import defaultTag from '@/assets/icons/active/tag.png';
import { Text, Box } from '@chakra-ui/react';

const TagComponent = ({ name, color, tag, doNotDisplayTag }: { name: string; color?: string; tag?: any; doNotDisplayTag?: boolean }) => 
{
	return(
		<div className="TagComponentWrapper">
			<Box
				display="flex"
				flexFlow="row nowrap"
				justifyContent="center"
				alignItems="center"
				backgroundColor="var(--relevant-background)"
				padding="1 "
				borderRadius="20px"
				ml="3"
			>
				{
					(doNotDisplayTag === false || doNotDisplayTag === undefined) &&
					<Image
						src={tag !== undefined ? tag : defaultTag}
						alt='tag icon'
						style={{width: 20, backgroundColor: color,}}
					/>
				}
				<Text
					ml="1"
					fontWeight="bold"
					fontSize="sm"
				>
					{ name }
				</Text>
			</Box>
		</div>
	)
}

export default TagComponent