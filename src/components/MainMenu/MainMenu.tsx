
import { useMediaQuery, Box } from '@chakra-ui/react';
import './MainMenu.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { mobileMenuSettings } from '@/utils/menu.configuration';


const MainMenu = () => 
{
	
	const router = useRouter();
	const [isForDesktop] = useMediaQuery('(min-width: 990px)');
	const [mobileMenuSettingsState, setMobileMenuSettingsState] = useState(mobileMenuSettings);

	const navigate = (setting: { src: any; label: string; clickable: boolean; name?: string; selected?: boolean }) => {
		if (setting.clickable) {
			router.push(`/${setting.label}`);
		}

	}

	return(
		<div className="MainMenuWrapper">
			{
				isForDesktop ? 
				<>
					
				</>
				:
				<>
					{
						mobileMenuSettingsState?.map(item => (
							<Box key={item.label + "icon"} onClick={() => navigate(item)}>
								<Image
									src={item.src}
									alt={item.label + "icon"}
								/>
							</Box>
						))
					}
				</>
			}			
		</div>
	)
}

export default MainMenu